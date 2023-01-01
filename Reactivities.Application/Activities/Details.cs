using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Constants.Message;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities;

public class Details
{
    public class Query : IRequest<IResult<Activity>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, IResult<Activity>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<IResult<Activity>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities.FindAsync(request.Id);
            return new Result<Activity>().Success(activity);
        }
    }
}