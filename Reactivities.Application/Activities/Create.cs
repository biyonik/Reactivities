using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Reactivities.Application.Constants.Message;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;
using Reactivities.Application.Validators;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities;

public class Create
{
    public class Command : IRequest<IResult<Unit>>
    {
        public Activity Activity { get; set; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command, IResult<Unit>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<IResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            await _context.Activities.AddAsync(request.Activity, cancellationToken);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            return !result 
                ? new Result<Unit>().Failure(ActivityMessageContstants.CreateFailed) 
                : new Result<Unit>().Success(Unit.Value);
        }
    }
}