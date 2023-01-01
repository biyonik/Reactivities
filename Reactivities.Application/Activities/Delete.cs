using MediatR;
using Reactivities.Application.Constants.Message;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities;

public class Delete
{
    public class Command : IRequest<IResult<Unit>>
    {
        public Guid Id { get; set; }
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
            var activity = await _context.Activities.FindAsync(request.Id);
            if (activity == null) return new Result<Unit>().Failure(ActivityMessageContstants.NotFound);
            
            _context.Remove(activity);
            var result = await _context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return new Result<Unit>().Failure(ActivityMessageContstants.DeleteFailed);
            return new Result<Unit>().Success(Unit.Value);
        }
    }
}