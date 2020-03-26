from flask import jsonify, request
from datetime import datetime as dt
from flask import current_app as app
import uuid
import bcrypt

from application.models import db, User

@app.route('/', methods=['GET'])
def hello():
    return jsonify({'response' : 'success'})

@app.route('/register', methods=['POST'])
def register():
    email = request.form.get('email')
    rawPass = request.form.get('password')
    print(request.form)
    if email and rawPass:
        hashed = bcrypt.hashpw(rawPass.encode(), bcrypt.gensalt(14))
        new_user = User(_id=str(uuid.uuid4()), email=email, password=hashed, auth_token=str(uuid.uuid4()), pushed=dt.now())
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"status" : "successfully registered user"})
    return jsonify({"status" : "did not successfully registered user"})

@app.route('/login', methods=['POST'])
def login():
    content = request.get_json(silent=True)
    if content:
        email = content['email']
        rawPass = content['password']
        if email and rawPass:
            user = User.query.filter_by(email=email).first()
            if user:
                if bcrypt.checkpw(rawPass.encode(), user.password):
                    return jsonify({"code" : 200, "status" : "Successfully logged in", "authToken" : user.auth_token})
    return jsonify({"code" : "401", "status" : "failed to log in"})