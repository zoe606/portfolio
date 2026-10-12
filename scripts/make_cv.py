"""Build the resume PDF served at /resume.

The CheckProof entry and the summary are read from src/lib/data; the rest of the CV is written below.

    python3 -m venv .venv && .venv/bin/pip install reportlab
    .venv/bin/python scripts/make_cv.py [output.pdf]
"""
import json
import re
import sys
from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer

REPO = Path(__file__).resolve().parent.parent
OUT = sys.argv[1] if len(sys.argv) > 1 else str(REPO / 'static/Librantara_Erlangga_CV_2026.pdf')

base = ParagraphStyle('base', fontName='Helvetica', fontSize=10.5, leading=14)
name = ParagraphStyle('name', parent=base, fontName='Helvetica-Bold', fontSize=16, leading=20)
heading = ParagraphStyle('heading', parent=base, fontName='Helvetica-Bold', fontSize=13, leading=16,
                         spaceBefore=16, spaceAfter=6)
entry = ParagraphStyle('entry', parent=base, spaceBefore=4)
sub = ParagraphStyle('sub', parent=base, fontName='Helvetica-Bold', spaceBefore=4)
bullet = ParagraphStyle('bullet', parent=base, leftIndent=12)

story = []


def p(text, style=base):
    story.append(Paragraph(text, style))


def bullets(items):
    for item in items:
        p('- ' + escape(item), bullet)


def job(company, role, where, period, items):
    start = len(story)
    p(f'<b>{escape(company)} — {escape(role)} ({escape(where)})</b> — {period}', entry)
    bullets(items)
    story[start:] = [KeepTogether(story[start:])]


def sentences(text):
    return [s.strip() for s in re.split(r'(?<=\.)\s+(?=[A-Z])', text) if s.strip()]


DATA = REPO / 'src/lib/data'
cp = next(e for e in json.loads((DATA / 'experiences.json').read_text()) if e['slug'] == 'checkproof-backend')
summary = json.loads((DATA / 'site.json').read_text())['home']['description']

p('Librantara Erlangga', name)
story.append(Spacer(0, 6))
p('Backend Software Engineer')
p('Bandung, Indonesia | +62 898-1999-833 | librantaraerlangga@gmail.com')
p('linkedin.com/in/librantara-erlangga | github.com/zoe606')
story.append(Spacer(0, 8))

p('Professional Summary', heading)
p(escape(summary))
story.append(Spacer(0, 4))

p('Professional Experience', heading)
job(cp['company'], cp['name'], cp['location'], 'Feb 2026 – Present', sentences(cp['description']))
job('Luce Maintenance Group Pte Ltd', 'Full-stack Engineer', 'Hybrid, Singapore-based', 'Jan 2025 – Jan 2026', [
    'Led backend scalability, security, and refactoring initiatives across a large monolithic system composed of multiple components.',
    'Authored and standardized technical documentation for all core components, improving developer onboarding and maintainability.',
    'Boosted test coverage from 26% (Jan) to 77% (Jul) through systematic testing with RSpec & VCR.',
    'Upgraded Rails 7.0 → 7.2 safely by addressing transaction rollback, encryption, and dependency issues.',
    'Improved dependency freshness: Backend 26% → 83%, Frontend 25% → 78%.',
    'Reduced operational errors and improved performance metrics across key systems.',
    'Proactively monitored application health using Sentry and New Relic.',
    'Contributed frontend and mobile features using React and React Native.',
])
job('PrivyID', 'Backend Engineer', 'Onsite, Indonesia-based', 'Jan 2023 – Nov 2024', [
    'Designed and deployed a high-throughput wallet ID generator in Go, cutting generation time from 2 hours to 5 minutes using goroutines and distributed workers.',
    'Maintained wallet service handling heavy production load, ensuring reliability and fault tolerance.',
    'Improved legacy Ruby codebases for performance and maintainability.',
    'Monitored Datadog dashboards and alerts for real-time observability.',
    'Collaborated with cross-functional teams to align engineering deliverables with product goals.',
])
job('Citraraya Nusatama (D’Health)', 'Development Team Lead', 'Hybrid, Indonesia', 'Jan 2021 – Dec 2022', [
    'Led a team of 5 engineers to build and maintain a hospital information system used by 10+ hospitals.',
    'Conducted regular code reviews, mentorship, and technical planning sessions.',
    'Standardized engineering practices, reducing delivery delays and improving code quality.',
    'Collaborated with QA and product teams to meet feature delivery targets.',
])
job('Docotel Teknologi', 'Web Developer', 'Onsite, Indonesia', 'Apr 2019 – Jan 2021', [
    'Developed HIS modules using GatsbyJS (React) and Vue.',
    'Integrated national healthcare systems — BPJS, eKlaim, SatuSehat — into hospital platforms.',
    'Built internal mobile apps and accounting modules.',
    'Contributed to SATPAS (SIM Administration System) under agile workflows.',
])

p('Key Achievements', heading)
achievements = [
    ('At CheckProof (2026–Present)', [
        'Scheduling engine load-tested at 1M tasks with zero failures or deadlocks',
        '75% fewer database calls per task status change',
    ]),
    ('At Luce (2025–2026)', [
        '+51% increase in backend test coverage (26% → 77%)',
        '+57% increase in dependency freshness (backend)',
        '−73% reduction in production Sentry errors',
        '100% removal of high-severity security issues',
        '32% improvement in fast API call performance (p95 <500ms)',
    ]),
    ('At PrivyID (2023–2024)', [
        'Reduced ID generation time from 2 hours → 5 minutes by redesigning wallet ID generation with Go and distributed workers.',
        'Improved reliability through proactive system monitoring and performance tuning.',
    ]),
    ('At D’Health (2021–2022)', [
        'Delivered production-grade hospital system used by 10+ hospitals nationwide.',
        'Standardized team workflows, improving release predictability and code quality.',
    ]),
    ('At Docotel (2019–2021)', [
        'Integrated BPJS, eKlaim, and SatuSehat APIs into HIS modules using GatsbyJS and Vue.',
        'Contributed to SATPAS (national driver licensing system) under Agile workflows.',
    ]),
]
for title, items in achievements:
    p(escape(title), sub)
    bullets(items)

p('Skills', heading)
for line in [
    'Languages: Go, Ruby, PHP, JavaScript, TypeScript',
    'Frameworks: Ruby on Rails, Laravel, Yii2, React, React Native, NestJS',
    'Databases: PostgreSQL, MySQL, MongoDB',
    'Tools & Platforms: Docker, Git, Linux, Sentry, New Relic, Asynq, Kafka',
    'Practices: Microservices, System Design, API Design (REST/GraphQL/gRPC), Pub/Sub Messaging, LLM Integration, '
    'Security & Resilience, CI/CD, Testing (RSpec/VCR), Refactoring, Agile (Scrum/Kanban)',
]:
    p(escape(line))

p('Education', heading)
p('Indonesia POS Polytechnic — Bachelor of Applied Science in Computer Science/Informatics (2019)')

p('Languages', heading)
p('Indonesian — Native')
p('English — Intermediate')

doc = SimpleDocTemplate(OUT, pagesize=A4, leftMargin=40, rightMargin=40, topMargin=40, bottomMargin=40,
                        title='Librantara Erlangga CV 2026', author='Librantara Erlangga')
doc.build(story)
