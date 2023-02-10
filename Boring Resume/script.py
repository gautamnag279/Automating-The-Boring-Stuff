from docx import Document

newDocument = Document()

newDocument.add_heading("This is Heading Level 1", 0)

newDocument.save("/testResume.docx")