# AutoOrg Blueprint Studio — Demo UI

A frontend-first demo of the AutoOrg blueprint experience described in the **AutoOrg Blueprint & Product Integration Plan**.

This project is intentionally **non-operational**:

- Flask only serves the UI and blueprint template data.
- No organization is created.
- No LLM is called.
- No Docker container is started.
- No MCP/tool connection is made.
- No cloud, GitHub, Kubernetes, database, or production action is executed.
- Form state and the “Spawn demo org” interaction are client-side only.

## Included blueprints

1. Product Builder
2. Application Developer
3. Architecture Studio
4. Platform & SRE
5. Data & ML Engineering
6. Autonomous Software Factory
7. Custom Organization

The UI loads sample values by default and includes blueprint-specific fields, the A0–A4 autonomy model, user expertise controls, delegation controls, tool/MCP selections, environment access preview, approval gates, and an organization preview.

## Run locally

```bash
python -m venv .venv
# Windows
.venv\\Scripts\\activate
# Linux/macOS
# source .venv/bin/activate

pip install -r requirements.txt
python app.py
```

Open: http://127.0.0.1:5000

## Project layout

```text
autoorg_blueprint_demo/
├── app.py
├── requirements.txt
├── README.md
├── data/
│   └── blueprints.json
├── templates/
│   ├── base.html
│   ├── index.html
│   └── blueprint.html
└── static/
    ├── style.css
    └── app.js
```

## Product-plan alignment

The UI is based on the proposed model in the attached AutoOrg plan:

`User Profile + Blueprint + Knowledge Pack + Autonomy Policy + Environment/Access Policy + Tool/MCP Configuration → Organization Instance`

The UI also reflects the proposed seven-blueprint portfolio and A0–A4 autonomy model.
