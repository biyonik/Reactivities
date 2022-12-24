using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reactivities.Persistence;

namespace Reactivities.API.Controllers;

public class ActivitiesController: BaseApiController
{
    private readonly DataContext _context;

    [ActivatorUtilitiesConstructor]
    public ActivitiesController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var activities = await _context.Activities.ToListAsync();
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var activity = await _context.Activities.FirstOrDefaultAsync(x => x.Id == id);
        if (activity == null)
        {
            return NotFound();
        }

        return Ok(activity);
    }
}