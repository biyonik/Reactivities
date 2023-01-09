using MediatR;
using Microsoft.EntityFrameworkCore;
using Reactivities.Application.Abstract;
using Reactivities.Application.Constants.Message;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;
using Reactivities.Domain;
using Reactivities.Persistence;

namespace Reactivities.Application.Activities;

public class UpdateAttendance
{
    public class Command : IRequest<IResult<Unit>>
    {
        public Guid ActivityId { get; set; }
    }

    public class Handler : IRequestHandler<Command, IResult<Unit>>
    {
        private readonly DataContext _context;
        private readonly IUserAccessor _userAccessor;

        public Handler(DataContext context, IUserAccessor userAccessor)
        {
            _context = context;
            _userAccessor = userAccessor;
        }
        
        public async Task<IResult<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await _context.Activities
                .Include(a => a.Attendees)
                .ThenInclude(u => u.AppUser)
                .SingleOrDefaultAsync(x => x.Id == request.ActivityId, cancellationToken);

            if (activity == null) return new Result<Unit>().Failure(ActivityMessageContstants.NotFound);

            var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername(), cancellationToken: cancellationToken);

            if (user == null) return new Result<Unit>().Failure("User not found!");

            var hostUserName = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

            var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);
            if (attendance != null && hostUserName == user.UserName)
            {
                activity.IsCancelled = !activity.IsCancelled;
            }

            if (attendance != null && hostUserName != user.UserName)
            {
                activity.Attendees.Remove(attendance);
            }

            if (attendance == null)
            {
                attendance = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = activity,
                    IsHost = false
                };
                activity.Attendees.Add(attendance);
            }

            var result = await _context.SaveChangesAsync(cancellationToken) > 0;

            return result
                ? new Result<Unit>().Success(Unit.Value)
                : new Result<Unit>().Failure("Problem updating attendance");
        }
    }
}