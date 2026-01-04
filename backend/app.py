from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta


app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["SECRET_KEY"] = "super-secret-key"
db = SQLAlchemy(app)

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    completed = db.Column(db.Boolean, default=False)
    priority = db.Column(db.String(20), default="Medium")
    due_date = db.Column(db.String(20), nullable=True)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)

@app.route("/signup", methods=["POST"])
def signup():
    data = request.json

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = generate_password_hash(data["password"])

    user = User(
        name=data["name"],
        email=data["email"],
        password=hashed_pw
    )

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201

@app.route("/login", methods=["POST"])
def login():
    data = request.json
    user = User.query.filter_by(email=data["email"]).first()

    if not user or not check_password_hash(user.password, data["password"]):
        return jsonify({"error": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "user_id": user.id,
            "exp": datetime.utcnow() + timedelta(days=1)
        },
        "SECRET_KEY",
        algorithm="HS256"
    )

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        }
    })


@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([
        {
            "id": t.id,
            "title": t.title,
            "completed": t.completed,
            "priority": t.priority,
            "due_date": t.due_date
        }
        for t in tasks
    ])


@app.route("/tasks", methods=["POST"])
def add_task():
    data = request.json

    task = Task(
        title=data["title"],
        priority=data.get("priority", "Medium"),
        due_date=data.get("due_date")
    )

    db.session.add(task)
    db.session.commit()

    return jsonify({
        "id": task.id,
        "title": task.title,
        "completed": task.completed,
        "priority": task.priority,
        "due_date": task.due_date
    }), 201



@app.route("/tasks/<int:id>", methods=["PATCH"])
def update_task(id):
    task = Task.query.get_or_404(id)
    task.completed = not task.completed
    db.session.commit()

    return jsonify({
        "id": task.id,
        "title": task.title,
        "completed": task.completed,
        "priority": task.priority,
        "due_date": task.due_date
    })



@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)
    db.session.delete(task)
    db.session.commit()
    return jsonify({"message": "Task deleted"})



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(host="127.0.0.1", port=5000, debug=True)

