Humanities = 'humanities'
SocialSciences = 'social_sciences'
NaturalSciences = 'natural_sciences'
FormalSciences = 'formal_sciences'
AppliedSciences = 'applied_sciences'
ACADEMIC_DISCIPLINES_CHOICES = [
        (Humanities, [
            ('arts', 'Arts'),
            ('history', 'History'),
            ('home_economics', 'Home economics'),
            ('languages_literature', 'Languages and literature'),
            ('law', 'Law'),
            ('philosophy', 'Philosophy'),
            ('theology', 'Theology')
        ]),
        (SocialSciences, [
            ('anthropology', 'Anthropology'),
            ('archaeology', 'Archaeology'),
            ('economics', 'Economics'),
            ('geography', 'Geography'),
            ('political_science', 'Political science'),
            ('psychology', 'Psychology'),
            ('sociology', 'Sociology'),
            ('social_work', 'Social Work'),
        ]),
        (NaturalSciences, [
            ('biology', 'Biology'),
            ('chemistry', 'Chemistry'),
            ('earth_science', 'Earth science'),
            ('space_sciences', 'Space sciences'),
            ('physics', 'Physics'),
        ]),
        (FormalSciences, [
            ('computer_science', 'Computer Science'),
            ('mathematics', 'Mathematics'),
            ('statistics', 'Statistics'),
        ]),
        (AppliedSciences, [
            ('business', 'Business'),
            ('engineering_technology', 'Engineering and technology'),
            ('medicine_health', 'Medicine and health'),

        ]),
]

INDUSTRY_FIELDS_CHOICES = [
    ('agriculture', 'Agriculture'),
    ('artist', 'Artist'),
    ('business', 'Business'),
    ('communications', 'Communications'),
    ('education', 'Education'),
    ('engineering', 'Engineering'),
    ('environment', 'Environment'),
    ('financial', 'Financial'),
    ('government', 'Government'),
    ('health', 'Health'),
    ('legal', 'Legal'),
    ('manufacturing', 'Manufacturing'),
    ('service_sector', 'Service Sector'),
    ('technical', 'Technical'),
    ('technology ', 'Technology '),
    ('technology_non_compute', 'Technology - non-Compute'),
]

PROGRAMMER = 'programmer'
PROJECT_MANAGER = 'project_manager'
DATA_ANALYST = 'data_analyst'
BUSINESS_ANALYST = 'business_analyst'
OTHER = 'other'
COLLABORATION_POSITIONS = [
    (PROGRAMMER, ('Programmer')),
    (PROJECT_MANAGER, ('Project Manager')),
    (DATA_ANALYST, ('Data Analyst')),
    (BUSINESS_ANALYST, ('Business Analyst')),
    (OTHER, ('Other')),
]

REJECTED = 'rejected'
ACCEPTED = 'accepted'
EVALUATING = 'evaluating'
COLLABORATI_STATUS = [
    (REJECTED, ('Rejected')),
    (ACCEPTED, ('Accepted')),
    (EVALUATING, ('Evaluating')),
]

# POSITIONS = [
#     Developer
#         DevelopersSkills
#     Designer
#         UX
#         UI
#     ProductDesigner
#     FinanceExpert
#         Financial Modeling Consultants
#         Venture Capital Consultants
#         Market Research Analyst
#     ProjectManager
#         Web Project Managers
#         Mobile Project
#         Agile Conslutants
#     ProductManager
#         Ideation & Validation
#         MVP & Go-To-MarketStrategy
#         Product Framework and Transformation
# ]