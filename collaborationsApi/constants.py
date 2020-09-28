from django.db import models
import urllib.request
from django.core.files.storage import FileSystemStorage

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

PUSH = 'push'
PULL = 'pull'
RECRUITMENT_FORM_CHOCIES = [
    (PUSH, ('Push')),
    (PULL, ('Pull')),
]

DEGREE = "degree"
PROFESSION = "profession"
ROLE_CHOICES = [
    (DEGREE, ('Degree')),
    (PROFESSION, ('Profession')),
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

# class InstitutionLogo(models.Model):
#     logo = models.ImageField(upload_to="images/logos/institution/", blank=True)

#     def __str__(self):
#         return str(self.logo)

# def create_logo(self, url, institution_name, obj):
#     institution = institution_name.upper()
#     is_file = urllib.request.urlretrieve(url, f"{institution}-logo.jpg")
#     if is_file:
#         print("FILES -I: ", is_file)
#         for f in files:
#             myfile = files[f]
#             # print("file type: ", myfile.content_type.split('/')[0])
#             if settings.USE_S3:
#                 obj.logo = myfile
#             else:
#                 file_type = myfile.content_type.split('/')[0]
#                 fs = FileSystemStorage()
#                 valid_extensions = ['.pdf', '.jpg', '.png']
#                 filename = fs.save("images/logos/institution/"+myfile.name, myfile)
#                 uploaded_file_url = fs.url(filename)
#                 # print("uploaded_file_url", uploaded_file_url)
#                 # print("myfile.name", myfile.name)
#                 # profile.profile_avatar = myfile
#                 obj.logo = "images/logos/institution/"+myfile.name
#         obj.save()
#         return obj
# logo_MIT = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_CAMBRIDGE = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_OXFORD = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_STANDFORD = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_DUKE = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_CIDE = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_ITAM = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_COLMEX = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_ITESM = InstitutionLogo.objects.get(logo="MIT-logo.jpg")
# logo_UIA = InstitutionLogo.objects.get(logo="MIT-logo.jpg")

logo_MIT = "InstitutionLogo.objects.get(logo="
logo_CAMBRIDGE = "InstitutionLogo.objects.get(logo="
logo_OXFORD = "InstitutionLogo.objects.get(logo="
logo_STANDFORD = "InstitutionLogo.objects.get(logo="
logo_DUKE = "InstitutionLogo.objects.get(logo="
logo_CIDE = "InstitutionLogo.objects.get(logo="
logo_ITAM = "InstitutionLogo.objects.get(logo="
logo_COLMEX = "InstitutionLogo.objects.get(logo="
logo_ITESM = "InstitutionLogo.objects.get(logo="
logo_UIA = "InstitutionLogo.objects.get(logo="

MIT = 'MIT'
CAMBRIDGE = 'University of Cambridge'
OXFORD = 'University of Oxford'
STANDFORD = 'Stanford University'
DUKE = "Duke's University"
CIDE = "Center of Teaching and Research in Economics"
ITAM = "Autonomous Technological Institute of Mexico "
COLMEX = "El Colegio de México"
ITESM = "Monterrey Institute of Technology and Higher Education"
UIA = " Ibero-American University"
OTHER = 'other'
UNIVERSITIES = [
    (logo_MIT, [
        (MIT, ('Massachusetts Institute of Technology'))
    ]),
    (logo_CAMBRIDGE, [
        (CAMBRIDGE, ('University of Cambridge'))
    ]),
    (logo_OXFORD, [
        (OXFORD, ('University of Oxford'))
    ]),
    (logo_STANDFORD, [
        (STANDFORD, ('Stanford University'))
    ]),
    (logo_DUKE, [
        (DUKE, ("Duke's University"))
    ]),
    (logo_CIDE, [
        (CIDE, ("Center of Teaching and Research in Economics"))
    ]),
    (logo_ITAM, [
        (ITAM, ("Instituto Tecnológico Autónomo de México"))
    ]),
    (logo_COLMEX, [
        (COLMEX, ("El Colegio de México"))
    ]),
    (logo_ITESM, [
        (ITESM, ("Instituto Tecnológico y de Estudios Superiores de Monterrey"))
    ]),
    (logo_UIA, [
        (UIA, ("Universidad Iberoamericana"))
    ]),
    (OTHER, [('other')])
]

BACHELOR = "bachelor"
MASTER = "master"
DOCTORATE = "Doctorate"
DIPLOMA = 'diploma'
OTHER = "other"
DEGREES = [
    (BACHELOR, ('Bachelor Degree')),
    (MASTER, ('Masters Degree')),
    (DOCTORATE, ('Ph.D.')),
    (DIPLOMA, ('Diploma')),
    (OTHER, ('Other')),
]

Bachelor_of_Arts = "BA"
Bachelor_of_Science_And_Arts = "BSA"
Bachelor_of_Accountancy = "BAcy"
Bachelor_of_Accounting = "BAcc"
Bachelor_of_Animal_and_Veterinary_Bioscience = "B.An.Vet.Bio.Sc."
Bachelor_of_Applied_Science = "B.A.Sc."
Bachelor_of_Architecture = "BArch "
Bachelor_of_Business_Administration = "BBA"
Bachelor_of_Civil_Engineering = "BCE"
Bachelor_of_Commerce = "BCom"
Bachelor_of_Communications = "B.Comm."
Bachelor_of_Computer_Application = "BCA"
Bachelor_of_Dental_Hygiene = "BDH Or B.D.H"
Bachelor_of_Dental_Medicine = "BDM"
Bachelor_of_Dental_Science = "BDSc or B.D.Sc."
Bachelor_of_Dental_Surgery = "BDS or B.D.S."
Bachelor_of_Dentistry =	"BDent or B.Dent."
Bachelor_of_Design = "BDes or B.Des."
Bachelor_of_Design_Computing = "B.Des.Comp."
Bachelor_of_Design_in_Architecture = "B.Des.Arch."
Bachelor_of_Education =	"BEd or B.Ed."
Bachelor_of_Engineering = "BEng or B.Eng., or BE or B.E"
Bachelor_of_Electronic_Commerce = "BEC or B.E-COM."
Bachelor_of_Electrical_Engineering = "BEE or B.E.E."
Bachelor_of_Fine_Arts = "BFA or B.F.A."
Bachelor_of_Health_Sciences = "B.Hlth.Sci"
Bachelor_of_Information_Technology = "BIT or B.I.T."
Bachelor_of_International_and_Global_Studies = "BIGS or B.I.G.S."
Bachelor_of_Law = "LLB or LL.B."
Bachelor_of_Liberal_Arts_and_Sciences =	"BLAS or B.L.A.S."
Bachelor_of_Library_Science = "BLib or B.Lib., or BLS or B.L.S."
Bachelor_of_Literature = "BLit or B.Lit."
Bachelor_of_Mathematics = "BMath or B.Math"
Bachelor_of_Mechanical_Engineering = "BME or B.M.E."
Bachelor_of_Medical_Science = "B.Med.Sc."
Bachelor_of_Medicine = "MB or M.B."
Bachelor_of_Music = "B.M."
Bachelor_of_Music_Studies = "B.Mus.Studies"
Bachelor_of_Nursing = "BN or B.N."
Bachelor_of_Pharmacy = "B.Pharm."
Bachelor_of_Political_Economic_and_Social_Sciences = "B.P.E.S.S."
Bachelor_of_Resource_Economics = "B.Res.Ec."
Bachelor_of_Science = "BS"
Bachelor_of_Science_in_Dental_Hygiene = "BSDH or B.S.D.H"
Bachelor_of_Science_in_Environmental_and_Occupational_Health = "BS.EOH"
Bachelor_of_Science_in_Nursing = "BSN"
Bachelor_of_Socio_Legal_Studies = "BSLS or B.S.L.S."
Bachelor_of_Surgery = "BS or B.S."
Bachelor_of_Technology = "BTech or B.Tech."
Bachelor_of_Veterinary_Science = "B.V.Sc."
Bachelor_of_Visual_Arts = "BVA or B.V.A."
BACHELOR_DEGREES = [
    ("Bachelor_of_Arts", ("BA")),
    ("Bachelor_of_Science_And_Arts", ("BSA")),
    ("Bachelor_of_Accountancy", ("BAcy")),
    ("Bachelor_of_Accounting", ("BAcc")),
    ("Bachelor_of_Animal_and_Veterinary_Bioscience", ("B.An.Vet.Bio.Sc.")),
    ("Bachelor_of_Applied_Science", ("B.A.Sc.")),
    ("Bachelor_of_Architecture", ("BArch ")),
    ("Bachelor_of_Business_Administration", ("BBA")),
    ("Bachelor_of_Civil_Engineering", ("BCE")),
    ("Bachelor_of_Commerce", ("BCom")),
    ("Bachelor_of_Communications", ("B.Comm.")),
    ("Bachelor_of_Computer_Application", ("BCA")),
    ("Bachelor_of_Dental_Hygiene", ("BDH Or B.D.H")),
    ("Bachelor_of_Dental_Medicine", ("BDM")),
    ("Bachelor_of_Dental_Science", ("BDSc or B.D.Sc.")),
    ("Bachelor_of_Dental_Surgery", ("BDS or B.D.S.")),
    ("Bachelor_of_Dentistry", ("BDent or B.Dent.")),
    ("Bachelor_of_Design", ("BDes or B.Des.")),
    ("Bachelor_of_Design_Computing", ("B.Des.Comp.")),
    ("Bachelor_of_Design_in_Architecture", ("B.Des.Arch.")),
    ("Bachelor_of_Education", ("BEd or B.Ed.")),
    ("Bachelor_of_Engineering", ("BEng or B.Eng., or BE or B.E")),
    ("Bachelor_of_Electronic_Commerce", ("BEC or B.E-COM.")),
    ("Bachelor_of_Electrical_Engineering", ("BEE or B.E.E.")),
    ("Bachelor_of_Fine_Arts", ("BFA or B.F.A.")),
    ("Bachelor_of_Health_Sciences", ("B.Hlth.Sci")),
    ("Bachelor_of_Information_Technology", ("BIT or B.I.T.")),
    ("Bachelor_of_International_and_Global_Studies", ("BIGS or B.I.G.S.")),
    ("Bachelor_of_Law", ("LLB or LL.B.")),
    ("Bachelor_of_Liberal_Arts_and_Sciences", (	"BLAS or B.L.A.S.")),
    ("Bachelor_of_Library_Science", ("BLib or B.Lib., or BLS or B.L.S.")),
    ("Bachelor_of_Literature", ("BLit or B.Lit.")),
    ("Bachelor_of_Mathematics", ("BMath or B.Math")),
    ("Bachelor_of_Mechanical_Engineering", ("BME or B.M.E.")),
    ("Bachelor_of_Medical_Science", ("B.Med.Sc.")),
    ("Bachelor_of_Medicine", ("MB or M.B.")),
    ("Bachelor_of_Music", ("B.M.")),
    ("Bachelor_of_Music_Studies", ("B.Mus.Studies")),
    ("Bachelor_of_Nursing", ("BN or B.N.")),
    ("Bachelor_of_Pharmacy", ("B.Pharm.")),
    ("Bachelor_of_Political_Economic_and_Social_Sciences", ("B.P.E.S.S.")),
    ("Bachelor_of_Resource_Economics", ("B.Res.Ec.")),
    ("Bachelor_of_Science", ("BS")),
    ("Bachelor_of_Science_in_Dental_Hygiene", ("BSDH or B.S.D.H")),
    ("Bachelor_of_Science_in_Environmental_and_Occupational_Health", ("BS.EOH")),
    ("Bachelor_of_Science_in_Nursing", ("BSN")),
    ("Bachelor_of_Socio_Legal_Studies", ("BSLS or B.S.L.S.")),
    ("Bachelor_of_Surgery", ("BS or B.S.")),
    ("Bachelor_of_Technology", ("BTech or B.Tech.")),
    ("Bachelor_of_Veterinary_Science", ("B.V.Sc.")),
    ("Bachelor_of_Visual_Arts", ("BVA or B.V.A."))
]

Master_of_Architecture = "M.Arch., M.S."
Master_of_Arts =" MA, M.A. or A.M."
Master_of_Business_Administration =	"MBA or M.B.A."
Master_of_Commerce = "MCom or M.Com"
Master_of_Computer_Application = "MCA"
Master_of_Divinity = "MDiv or M.Div."
Master_of_Education = "M.Ed., M.S.Ed., or MSEd."
Master_of_Emergency_Management = "MEM or M.E.M."
Master_of_Emergency_and_Disaster_Management = "MEDM or M.E.D.M."
Master_of_Engineering =	"M.E., MEng or M.Eng."
Master_of_Fine_Arts = "MFA or M.F.A."
Master_of_Health_or_Healthcare_Management =	"MSc.HM or MHM"
Master_of_International_Affairs = "MIA or M.I.A."
Master_of_International_Studies = "MIS or M.I.S."
Master_of_Laws = "LLM or LL.M."
Master_of_Library_Science =	"MLS"
Master_of_Liberal_Arts = "MLA"
Master_of_Library_and_Information_Science = "MLIS"
Master_of_Music = " M.M."
Master_of_Professional_Studies = "MPS"
Master_of_Public_Administration = "MPA or M.P.A."
Master_of_Public_Health = "MPH or M.P.H."
Master_of_Science = "MS or M.S."
Master_of_Science_in_Information = "MSI or M.S.I."
Master_of_Social_Work =	"MSW or M.S.W."
Master_of_Strategic_Foresight = "MSF or M.S.F."
Master_of_Sustainable_Energy_and_Environmental_Management = "MSEEM"
Master_of_Technology = "MTech or M.Tech."
Master_of_Theology = "ThM or Th.M."
OTHER = "other"
MASTER_DEGREES = [
    ("Master_of_Architecture", ("M.Arch., M.S.")),
    ("Master_of_Arts", (" MA, M.A. or A.M.")),
    ("Master_of_Business_Administration", ("MBA or M.B.A.")),
    ("Master_of_Commerce", ("MCom or M.Com")),
    ("Master_of_Computer_Application", ("MCA")),
    ("Master_of_Divinity", ("MDiv or M.Div.")),
    ("Master_of_Education", ("M.Ed., M.S.Ed., or MSEd.")),
    ("Master_of_Emergency_Management", ("MEM or M.E.M.")),
    ("Master_of_Emergency_and_Disaster_Management", ("MEDM or M.E.D.M.")),
    ("Master_of_Engineering", ("M.E., MEng or M.Eng.")),
    ("Master_of_Fine_Arts", ("MFA or M.F.A.")),
    ("Master_of_Health_or_Healthcare_Management", ("MSc.HM or MHM")),
    ("Master_of_International_Affairs", ("MIA or M.I.A.")),
    ("Master_of_International_Studies", ("MIS or M.I.S.")),
    ("Master_of_Laws", ("LLM or LL.M.")),
    ("Master_of_Library_Science", ("MLS")),
    ("Master_of_Liberal_Arts", ("MLA")),
    ("Master_of_Library_and_Information_Science", ("MLIS")),
    ("Master_of_Music", (" M.M.")),
    ("Master_of_Professional_Studies", ("MPS")),
    ("Master_of_Public_Administration", ("MPA or M.P.A.")),
    ("Master_of_Public_Health", ("MPH or M.P.H.")),
    ("Master_of_Science", ("MS or M.S.")),
    ("Master_of_Science_in_Information", ("MSI or M.S.I.")),
    ("Master_of_Social_Work", ("MSW or M.S.W.")),
    ("Master_of_Strategic_Foresight", ("MSF or M.S.F.")),
    ("Master_of_Sustainable_Energy_and_Environmental_Management", ("MSEEM")),
    ("Master_of_Technology", ("MTech or M.Tech.")),
    ("Master_of_Theology", ("ThM or Th.M."))
]

Doctor_of_Acupuncture =	"DAc or D.Ac. or DAc."
Doctor_of_Audiology = "AuD or Au.D."
Doctor_of_Biblical_Studies = "DBS, D.B.S. or DB"
Doctor_of_Chiropractic = "DC or D.C."
Doctor_of_Dental_Surgery = "DDS or D.D.S."
Doctor_of_Divinity = "DD or D.D."
Doctor_of_Education = "EdD or Ed.D."
Doctor_of_Jurisprudence = "JD or J.D."
Doctor_of_Immortality = "ImD or Im.D."
Doctor_of_Law_and_Policy = "LP.D. or DLP"
Doctor_of_Medical_Dentistry = "DMD or D.M.D."
Doctor_of_Medicine = "MD or M.D."
Doctor_of_Ministry = "DMin"
Doctor_of_Metaphysics = "Dr. mph."
Doctor_of_Musical_Arts = "D.M.A."
Doctor_of_Naturopathy = "ND or N.D."
Doctor_of_Nursing_Practice = "DNP or D.N.P."
Doctor_of_Optometry = "OD or O.D."
Doctor_of_Osteopathy = "DO or D.O."
Doctor_of_Pharmacy = "PharmD or Pharm.D."
Doctor_of_Philosophy = "PhD, Ph.D., DPhil, D.Phil., DPh or D.Ph."
Doctor_of_Physical_Therapy = "DPT or D.P.T."
Doctor_of_Practical_Theology = "DPT or D.P.T."
Doctor_of_Psychology = "PsyD or Psy.D."
Doctor_of_Public_Health = "DrPH"
Doctor_of_Religious_Sciences = "Dr. sc. rel. or D.R.S."
Doctor_of_Science = "DSc, D.Sc. or ScD"
Doctor_of_Theology = "D.Th., Th.D. or ThD"
Doctor_of_Veterinary_Medicine = "DVM or D.V.M."

PHD_DEGREES = [
    ("Doctor_of_Acupuncture", ("DAc or D.Ac. or DAc.")),
    ("Doctor_of_Audiology", ("AuD or Au.D.")),
    ("Doctor_of_Biblical_Studies", ("DBS, D.B.S. or DB")),
    ("Doctor_of_Chiropractic", ("DC or D.C.")),
    ("Doctor_of_Dental_Surgery", ("DDS or D.D.S.")),
    ("Doctor_of_Divinity", ("DD or D.D.")),
    ("Doctor_of_Education", ("EdD or Ed.D.")),
    ("Doctor_of_Jurisprudence", ("JD or J.D.")),
    ("Doctor_of_Immortality", ("ImD or Im.D.")),
    ("Doctor_of_Law_and_Policy", ("LP.D. or DLP")),
    ("Doctor_of_Medical_Dentistry", ("DMD or D.M.D.")),
    ("Doctor_of_Medicine", ("MD or M.D.")),
    ("Doctor_of_Ministry", ("DMin")),
    ("Doctor_of_Metaphysics", ("Dr. mph.")),
    ("Doctor_of_Musical_Arts", ("D.M.A.")),
    ("Doctor_of_Naturopathy", ("ND or N.D.")),
    ("Doctor_of_Nursing_Practice", ("DNP or D.N.P.")),
    ("Doctor_of_Optometry", ("OD or O.D.")),
    ("Doctor_of_Osteopathy", ("DO or D.O.")),
    ("Doctor_of_Pharmacy", ("PharmD or Pharm.D.")),
    ("Doctor_of_Philosophy", ("PhD, Ph.D., DPhil, D.Phil., DPh or D.Ph.")),
    ("Doctor_of_Physical_Therapy", ("DPT or D.P.T.")),
    ("Doctor_of_Practical_Theology", ("DPT or D.P.T.")),
    ("Doctor_of_Psychology", ("PsyD or Psy.D.")),
    ("Doctor_of_Public_Health", ("DrPH")),
    ("Doctor_of_Religious_Sciences", ("Dr. sc. rel. or D.R.S.")),
    ("Doctor_of_Science", ("DSc, D.Sc. or ScD")),
    ("Doctor_of_Theology", ("D.Th., Th.D. or ThD")),
    ("Doctor_of_Veterinary_Medicine", ("DVM or D.V.M."))
]

PROGRAMMER = 'programmer'
PROJECT_MANAGER = 'project_manager'
DATA_ANALYST = 'data_analyst'
BUSINESS_ANALYST = 'business_analyst'
OTHER = 'other'
JOB_ACTIVITIES = [
    (PROGRAMMER, ('Programmer')),
    (PROJECT_MANAGER, ('Project Manager')),
    (DATA_ANALYST, ('Data Analyst')),
    (BUSINESS_ANALYST, ('Business Analyst')),
    (OTHER, ('Other')),
]

PROGRAMMER = 'programmer'
PROJECT_MANAGER = 'project_manager'
DATA_ANALYST = 'data_analyst'
BUSINESS_ANALYST = 'business_analyst'
OTHER = 'other'
TECHNOLOGIES = [
    (PROGRAMMER, ('Programmer')),
    (PROJECT_MANAGER, ('Project Manager')),
    (DATA_ANALYST, ('Data Analyst')),
    (BUSINESS_ANALYST, ('Business Analyst')),
    (OTHER, ('Other')),
]

PROGRAMMER = 'programmer'
PROJECT_MANAGER = 'project_manager'
DATA_ANALYST = 'data_analyst'
BUSINESS_ANALYST = 'business_analyst'
OTHER = 'other'
JOB_POSITIONS = [
    (PROGRAMMER, ('Programmer')),
    (PROJECT_MANAGER, ('Project Manager')),
    (DATA_ANALYST, ('Data Analyst')),
    (BUSINESS_ANALYST, ('Business Analyst')),
    (OTHER, ('Other')),
]

