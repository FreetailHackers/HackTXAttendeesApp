from . import db

class User(db.Model):
    __tablename__ = 'users'
    _id = db.Column(db.String(36), primary_key=True)
    email = db.Column(db.String(64), index=False, unique=True, nullable=False)
    password = db.Column(db.LargeBinary, index=False, unique=False, nullable=False)
    auth_token = db.Column(db.String(64), index=False, unique=True, nullable=False)
    pushed = db.Column(db.DateTime, index=False, unique=False, nullable=False)
    
    def __repr__(self):
        return '<User id={} email={} password={} auth_token={} pushed={}>'.format(_id, email, password, auth_token, pushed)
