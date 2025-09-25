from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import Users
from Hello.models import Freelancer_detail
from recruiter.models import Recruiter_detail

@receiver(post_save, sender=Users)
def create_user_detail(sender, instance, created, **kwargs):
    if created:
        if instance.role == 'freelancer':
            Freelancer_detail.objects.create(
                user=instance,
                age=None,
                skills=None,
            )
        elif instance.role == 'recruiter':
            Recruiter_detail.objects.create(
                user=instance,
                company_name=None,
                job_title=None,
            )