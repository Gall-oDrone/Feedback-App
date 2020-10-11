from django.contrib.sites.models import Site
from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from django.db.models.signals import post_save
from django_countries.fields import CountryField
from home.settings.storage_backends import MediaStorage
from allauth.account.signals import user_signed_up
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _
from collaborationsApi.constants import *
# from django.contrib.auth import get_user_model
# UserModel = get_user_model()
# from .serializers import send_verification_email

class User(AbstractUser):
    is_student = models.BooleanField(default=False)
    is_teacher = models.BooleanField(default=False)
    email = models.EmailField(unique=True, null=True)
    university = models.CharField(max_length=70, blank=True)
    partners = models.CharField(max_length=30, blank=True, null=True)
    website = models.CharField(max_length=60, blank=True, null=True)

    is_active_user = models.BooleanField(
        _('active'),
        default=False,
        help_text=_(
            'Designates whether this user should be treated as active. '
            'Unselect this instead of deleting accounts.'
        ),
    )
    # USERNAME_FIELD = 'email'

    def __str__(self):
        return self.username
    
    def get_full_name(self):
        return self.email

    def get_short_name(self):
        return self.email

    @receiver(user_signed_up)
    def populate_profile(sociallogin, user, **kwargs):
        print("populate_profile METHOD", kwargs, user.username)
        profile = Profile()
        profile_info = ProfileInfo()

        if sociallogin.account.provider == 'facebook':
            user_data = user.socialaccount_set.filter(provider='facebook')[0].extra_data
            picture_url = "http://graph.facebook.com/" + sociallogin.account.uid + "/picture?type=large"
            email = user_data['email']
            full_name = user_data['name']

        if sociallogin.account.provider == 'google':
            user_data = user.socialaccount_set.filter(provider='google')[0].extra_data
            picture_url = user_data['picture']
            email = user_data['email']
            full_name = user_data['name']
        
        print("user_data: ", user_data)
        user = User.objects.get(email=user_data['email'])
        try:
            profile.user_id = user.id
            print("CODSO: ", user.profile.notification_counter, ", ", user.profileinfo_set)
            user.profile.profile_avatar = picture_url
            # profile.save()

            # profile_info = ProfileInfo.objects.get_or_create(profile_username=user)
            # profile_info.profile = user.profile
            # profile_info.profile_username = user
            # profile_info.name = user_data['name']
            user.save()
        except Exception as e:
            print("Exception: ", e)
            user.delete()


        # if(user.is_active_user == False):
        #     send_verification_email()


        # user.profile.picture = picture_url
        # user.profile.email = email
        # user.profile.full_name = full_name
        # user.profile.save()

class UserFollowing(models.Model):

    user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="following", on_delete=models.CASCADE)
    following_user_id = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="followers", on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        unique_together = ("user_id", "following_user_id")
        ordering = ["-created"]

    def __str__(self):
        f"{self.user_id} follows {self.following_user_id}"

class Universities(models.Model):
    MIT = 'Massachusetts Institute of Technology'
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
        (MIT, ('Massachusetts Institute of Technology')),
        (CAMBRIDGE, ('University of Cambridge')),
        (OXFORD, ('University of Oxford')),
        (STANDFORD, ('Stanford University')),
        (DUKE, ("Duke's University")),
        (CIDE, ("Center of Teaching and Research in Economics")),
        (ITAM, ("Instituto Tecnológico Autónomo de México")),
        (COLMEX, ("El Colegio de México")),
        (ITESM, ("Instituto Tecnológico y de Estudios Superiores de Monterrey")),
        (UIA, ("Universidad Iberoamericana")),
        (OTHER, ('other'))
    ]
    university=models.CharField(max_length=100, choices=UNIVERSITIES, blank=True)

    def __str__(self):
        return self.university

class Degree(models.Model):
    BACHELOR = "Bachelor's degree"
    MASTER = "Master's degree"
    DOCTORATE = "Doctorate"
    OTHER = "Other"
    DEGREES = [
        (BACHELOR, ('B')),
        (MASTER, ('M')),
        (DOCTORATE, ('pHd')),
        (OTHER, ('Other')),
    ]
    degree=models.CharField(max_length=100, choices=DEGREES, blank=True)

    def __str__(self):
        return self.degree

class Bachelor(models.Model):
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
    bachelor_degree=models.CharField(max_length=100, choices=BACHELOR_DEGREES, blank=True)

    def __str__(self):
        return self.bachelor_degree

class Master(models.Model):
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
    master_degree=models.CharField(max_length=100, choices=MASTER_DEGREES, blank=True)

    def __str__(self):
        return self.master_degree

class Doctorate(models.Model):
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
    pHd_degree=models.CharField(max_length=100, choices=PHD_DEGREES, blank=True)

    def __str__(self):
        return self.pHd_degree

class Course(models.Model):
    Architecture = "Architecture"
    Art_History = "Art_History"
    Design = "Design"
    Film_Studies = "Film_Studies"
    Fine_Arts = "Fine_Arts"
    Graphic_Design = "Graphic_Design"
    Music = "Music"
    Video_Game_Design = "Video_Game_Design"
    Accounting = "Accounting"
    Entrepreneurship = "Entrepreneurship"
    Finance = "Finance"
    Management = "Management"
    Marketing = "Marketing"
    Negotiations = "Negotiations"
    Biomedical_Engineering = "Biomedical_Engineering"
    Chemical_Engineering = "Chemical_Engineering"
    Electrical_Engineering = "Electrical_Engineering"
    Mechanical_Engineering = "Mechanical_Engineering"
    Systems_Engineering = "Systems_Engineering"
    Communications = "Communications"
    History = "History"
    Languages = "Languages"
    Literature = "Literature"
    Philosophy = "Philosophy"
    Religious_Studies = "Religious_Studies"
    Writing = "Writing"
    Dentistry = "Dentistry"
    Disease_and_Epidemiology = "Disease_and_Epidemiology"
    Healthcare_Administration = "Healthcare_Administration"
    Nursing = "Nursing"
    Nutrition = "Nutrition"
    Astronomy = "Astronomy"
    Biology = "Biology"
    Chemistry = "Chemistry"
    Computer_Science = "Computer_Science"
    Earth_Sciences = "Earth_Sciences"
    Environmental_Studies = "Environmental_Studies"
    Mathematics = "Mathematics"
    Physics = "Physics"
    Anthropology = "Anthropology"
    Criminal_Justice = "Criminal_Justice"
    Early_Childhood_Education = "Early_Childhood_Education"
    Economics = "Economics"
    Education = "Education"
    Elementary_Education = "Elementary_Education"
    International_Relations = "International_Relations"
    Law = "Law"
    Liberal_Studies = "Liberal_Studies"
    Political_Science = "Political_Science"
    Psychology = "Psychology"
    Social_Work = "Social_Work"
    Sociology = "Sociology"

    COURSES = [
        ("Architecture", ("Architecture")),
        ("Art_History", ("Art_History")),
        ("Design", ("Design")),
        ("Film_Studies", ("Film_Studies")),
        ("Fine_Arts", ("Fine_Arts")),
        ("Graphic_Design", ("Graphic_Design")),
        ("Music", ("Music")),
        ("Video_Game_Design", ("Video_Game_Design")),
        ("Accounting", ("Accounting")),
        ("Entrepreneurship", ("Entrepreneurship")),
        ("Finance", ("Finance")),
        ("Management", ("Management")),
        ("Marketing", ("Marketing")),
        ("Negotiations", ("Negotiations")),
        ("Biomedical_Engineering", ("Biomedical_Engineering")),
        ("Chemical_Engineering", ("Chemical_Engineering")),
        ("Electrical_Engineering", ("Electrical_Engineering")),
        ("Mechanical_Engineering", ("Mechanical_Engineering")),
        ("Systems_Engineering", ("Systems_Engineering")),
        ("Communications", ("Communications")),
        ("History", ("History")),
        ("Languages", ("Languages")),
        ("Literature", ("Literature")),
        ("Philosophy", ("Philosophy")),
        ("Religious_Studies", ("Religious_Studies")),
        ("Writing", ("Writing")),
        ("Dentistry", ("Dentistry")),
        ("Disease_and_Epidemiology", ("Disease_and_Epidemiology")),
        ("Healthcare_Administration", ("Healthcare_Administration")),
        ("Nursing", ("Nursing")),
        ("Nutrition", ("Nutrition")),
        ("Astronomy", ("Astronomy")),
        ("Biology", ("Biology")),
        ("Chemistry", ("Chemistry")),
        ("Computer_Science", ("Computer_Science")),
        ("Earth_Sciences", ("Earth_Sciences")),
        ("Environmental_Studies", ("Environmental_Studies")),
        ("Mathematics", ("Mathematics")),
        ("Physics", ("Physics")),
        ("Anthropology", ("Anthropology")),
        ("Criminal_Justice", ("Criminal_Justice")),
        ("Early_Childhood_Education", ("Early_Childhood_Education")),
        ("Economics", ("Economics")),
        ("Education", ("Education")),
        ("Elementary_Education", ("Elementary_Education")),
        ("International_Relations", ("International_Relations")),
        ("Law", ("Law")),
        ("Liberal_Studies", ("Liberal_Studies")),
        ("Political_Science", ("Political_Science")),
        ("Psychology", ("Psychology")),
        ("Social_Work", ("Social_Work")),
        ("Sociology", ("Sociology"))
    ]
    course=models.CharField(max_length=100, choices=COURSES, blank=True)

    def __str__(self):
        return self.course


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

class Partners(models.Model):
    partner_email = models.CharField(max_length=30, blank=True, null=True)
    def __str__(self):
        return self.partner_email

class School(models.Model):
    school = models.CharField(max_length=60, blank=True, null=True)
    def __str__(self):
        return self.school

class Website(models.Model):
    website = models.CharField(max_length=60, blank=True, null=True)
    def __str__(self):
        return self.website

class ChatGroup(models.Model):
    group_id = models.CharField(max_length=100)
    name = models.CharField(max_length=100, blank=True, null=True)
    group_admin = models.ForeignKey(User, on_delete=models.CASCADE, related_name="grpadmin")

    def __str__(self):
        return self.chatgroupid

class ChatGroupUser(models.Model):
    groupuser = models.ForeignKey(Student, on_delete=models.CASCADE)
    chat_group = models.ForeignKey(ChatGroup, on_delete=models.CASCADE)

    def __str__(self):
        return self.groupuser.username

class Profile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    slug = models.SlugField()
    stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
    one_click_purchasing = models.BooleanField(default=False)
    profile_avatar = models.ImageField(upload_to="profileAvatar/", blank=True)
    friends = models.ManyToManyField("Profile", blank=True)
    notifications = models.ManyToManyField("MeetingRequest", blank=True)
    notification_counter = models.IntegerField(default=0)

    def __str__(self):
        return str(self.user.username)

    def get_absolute_url(self):
    	return "/users/{}".format(self.slug)

    def post_save_user_model_receiver(sender, instance, created, *args, **kwargs):
        if created:
            try:
                Profile.objects.create(user=instance)
            except:
                pass
    post_save.connect(post_save_user_model_receiver, sender=settings.AUTH_USER_MODEL)

    def get_profile_avatar(self, pk):
        if self.pk == pk:
            return self.profile_avatar

# class StudentType(models.Model):
#     s_type = models.CharField(max_length=100, choices=STUDENT_TYPE, blank=True)
class UserUndergraduate(models.Model):
        course = models.ForeignKey(Course, related_name="user_resume_course", on_delete=models.CASCADE)
        from_date = models.DateTimeField(auto_now_add=False)
        to_date = models.DateTimeField(auto_now_add=False)
        # student_type = models.CharField(max_length=100, choices=StudentType, blank=True)
        institution=UNIVERSITIES

class UserBachelor(models.Model):
        degree = models.CharField(max_length=100, choices=BACHELOR_DEGREES, blank=True)
        from_date = models.DateTimeField(auto_now_add=False)
        to_date = models.DateTimeField(auto_now_add=False)
        institution=UNIVERSITIES

class UserMaster(models.Model):
        degree = models.CharField(max_length=100, choices=MASTER_DEGREES, blank=True)
        from_date = models.DateTimeField(auto_now_add=False)
        to_date = models.DateTimeField(auto_now_add=False)
        institution=UNIVERSITIES

class UserDoctorate(models.Model):
        degree = models.CharField(max_length=100, choices=PHD_DEGREES, blank=True)
        from_date = models.DateTimeField(auto_now_add=False)
        to_date = models.DateTimeField(auto_now_add=False)
        institution=UNIVERSITIES

# class UserDiplomaOrCertificate(models.Model):
#         diploma = models.CharField(max_length=100, choices=BACHELOR_DEGREES, blank=True)
#         certificate = models.CharField(max_length=100, choices=BACHELOR_DEGREES, blank=True)
#         from_date = models.DateTimeField(auto_now_add=False)
#         to_date = models.DateTimeField(auto_now_add=False)
#         institution=UNIVERSITIES


### TODO #######
# class PersonalInfo(models.Model):
#     name = models.CharField(max_length=50, blank=True)
#     last_name = models.CharField(max_length=50, blank=True)
#     profesion = models.CharField(max_length=50, blank=True)
#     location = CountryField(blank_label='(select country)')
#     about_me = models.TextField(max_length=500, blank=True)

# class Education(models.Model):
#     academic_degree = models.ForeignKey(Degree, blank=True)
#     undergrad =  models.ForeignKey(UserUndergraduate, blank=True)
#     bachelor = models.ManyToManyField(UserBachelor, blank=True)
#     master = models.ManyToManyField(UserMaster, blank=True)
#     phd = models.ManyToManyField(UserDoctorate, blank=True)
#     other_edu = models.ManyToManyField(UserDiplomaOrCertificate, blank=True)

# class JobActivityDescription(models.Model):
#     job_desc = models.TextField(max_length=500, blank=True)

# class TechnologyUsed(models.Model):
#     technology = models.CharField(max_length=100, choices=TECHNOLOGIES, blank=True)
# classSkillUsed(models.Model):
#     skill = models.CharField(max_length=100, choices=TECHNOLOGIES, blank=True)

# class JobPosition(models.Model):
#         position = models.CharField(max_length=100, choices=JOB_POSITIONS, blank=True)
#         enterprise = models.CharField(max_length=100, choices=JOB_POSITIONS, blank=True)
#         location = models.CharField(max_length=100, choices=JOB_POSITIONS, blank=True)
#         from_date = models.DateTimeField(auto_now_add=False)
#         to_date = models.DateTimeField(auto_now_add=False)
#         job_activities_desc = models.ManyToManyField(JobActivityDescription, blank=True)
#         technologies_used = models.ManyToManyField(TechnologyUsed, blank=True)
#         skills_used = models.ManyToManyField(classSkillUsed, blank=True)

# class Employment(models.Model):
#     job_positions = models.ManyToManyField(JobPosition, blank=True)

# class Experience(models.Model):
#     experience_tags(many to many)
#         experience_tag

# class Profile2(models.Model):
#     user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
#     stripe_customer_id = models.CharField(max_length=50, blank=True, null=True)
#     profile_avatar = models.ImageField(upload_to="profileAvatar/", blank=True)
#     friends = models.ManyToManyField("Profile", blank=True)
#     notifications = models.ManyToManyField("MeetingRequest", blank=True)
#     notification_counter = models.IntegerField(default=0)

#     message = models.CharField(max_length=150, blank=True, null=True)
#     personal = models.ForeignKey(PersonalInfo, related_name="profile_personal_details", on_delete=models.CASCADE)
#     academic = models.ForeignKey(Education, related_name="profile_academic_details", on_delete=models.CASCADE)
#     employment = models.ForeignKey(Employment, related_name="profile_employment_details", on_delete=models.CASCADE)
#     def __str__(self):
#         return "{} profile info".format(self.profile_username.username)
    
#     def avatar(self, pk):
#         return  self.profile_avatar

class ProfileInfo(models.Model):
    profile = models.ForeignKey(Profile, related_name="user_profile", on_delete=models.CASCADE)
    profile_username = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100, blank=True, null=True)
    country = CountryField(blank_label='(select country)')
    university = models.ForeignKey(Universities, on_delete=models.CASCADE, related_name="profile_university")

    degree = models.ForeignKey(Degree, on_delete=models.CASCADE, related_name="user_degree", blank=True, null=True)
    bachelor = models.ForeignKey(Bachelor, on_delete=models.CASCADE, related_name="user_bachelor", blank=True, null=True)
    master = models.ForeignKey(Master, on_delete=models.CASCADE, related_name="user_master", blank=True, null=True)
    doctorate = models.ForeignKey(Doctorate, on_delete=models.CASCADE, related_name="user_pHD", blank=True, null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name="user_course", blank=True, null=True)

    undergraduate = models.BooleanField(default=False)
    graduate = models.BooleanField(default=False)
    postgraduate = models.BooleanField(default=False)

    work_experience = models.BooleanField(default=False)
    job_position = models.CharField(max_length=400, blank=True, null=True)
    website = models.CharField(max_length=50, blank=True, null=True)
    message = models.CharField(max_length=150, blank=True, null=True)
    # Position
    # Responsabilities
    # Department
    # Skills
    github = models.CharField(max_length=50, blank=True, null=True)
    # degree = models.CharField(max_length=100, blank=True, null=True)
    # major = models.CharField(max_length=100, blank=True, null=True)
    # experience = models.CharField(max_length=100, blank=True, null=True)
    # projects = models.ManyToManyField("Article")
    def __str__(self):
        return "{} profile info".format(self.profile_username.username)
    
    def avatar(self, pk):
        return  self.profile.profile_avatar
        


class FriendRequest(models.Model):
    to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='to_user', on_delete=models.CASCADE)
    from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='from_user', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True) # set when created 

    def __str__(self):
        return "From {}, to {}".format(self.from_user.username, self.to_user.username)

class MeetingRequest(models.Model):
	to_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='meeting_request_to_user', on_delete=models.CASCADE)
	from_user = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='meeting_request_from_user', on_delete=models.CASCADE)
	timestamp = models.DateTimeField(auto_now_add=True) # set when created 

	def __str__(self):
		return "LC Request From {}, to {}".format(self.from_user.username, self.to_user.username)