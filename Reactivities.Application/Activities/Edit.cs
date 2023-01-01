using AutoMapper;
using FluentValidation;
using MediatR;
using Reactivities.Application.Constants.Message;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;
using Reactivities.Application.Validators;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities;

public class Edit
{
    public class Command : IRequest<IResult<Unit>>
    {
        public Activity Activity { get; set; }
    }
    
    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.Activity.Id).NotEmpty().NotNull();
            RuleFor(x => x.Activity).SetValidator(new ActivityValidator());
        }
    }

    public class Handler : IRequestHandler<Command, IResult<Unit>>
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public Handler(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<IResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Activity.Id);
            if (activity == null) return new Result<Unit>().Failure(ActivityMessageContstants.NotFound);
            
            _mapper.Map(request.Activity, activity);

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return new Result<Unit>().Failure(ActivityMessageContstants.EditFailed);

            return new Result<Unit>().Success(Unit.Value);
        }
    }
}