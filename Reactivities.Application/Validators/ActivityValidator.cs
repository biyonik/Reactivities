using FluentValidation;
using Reactivities.Domain;

namespace Reactivities.Application.Validators;

public class ActivityValidator: AbstractValidator<Activity>
{
    public ActivityValidator()
    {
        RuleFor(a => a.Title).NotEmpty().MinimumLength(4);
        RuleFor(a => a.Description).MaximumLength(255);
        RuleFor(a => a.Date).NotEmpty();
        RuleFor(a => a.City).NotEmpty().MinimumLength(2).MaximumLength(32);
        RuleFor(a => a.Venue).NotEmpty().MinimumLength(2).MaximumLength(255);
        RuleFor(a => a.Category).NotEmpty();
    }
}