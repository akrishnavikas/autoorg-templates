from flask import Flask, render_template, jsonify
import json
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
DATA_FILE = BASE_DIR / 'data' / 'blueprints.json'

app = Flask(__name__)

with DATA_FILE.open('r', encoding='utf-8') as f:
    BLUEPRINTS = json.load(f)

@app.route('/')
def index():
    return render_template('index.html', blueprints=BLUEPRINTS)

@app.route('/api/blueprints')
def api_blueprints():
    # Demo-only read endpoint. No organization processing or persistence.
    return jsonify(BLUEPRINTS)

@app.route('/blueprint/<slug>')
def blueprint_detail(slug):
    blueprint = next((b for b in BLUEPRINTS if b['slug'] == slug), None)
    if not blueprint:
        return 'Blueprint not found', 404
    return render_template('blueprint.html', blueprint=blueprint, blueprints=BLUEPRINTS)

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, debug=True)
