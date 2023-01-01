using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities;

public class List
{
    public class Query : IRequest<IResult<List<Activity>>>
    {
    }

    public class Handler : IRequestHandler<Query, IResult<List<Activity>>>
    {
        private readonly DataContext _context;

        public Handler(DataContext context)
        {
            _context = context;
        }

        public async Task<IResult<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var activities = await _context.Activities.ToListAsync(cancellationToken);
            return new Result<List<Activity>>().Success(activities);
        }
    }
}