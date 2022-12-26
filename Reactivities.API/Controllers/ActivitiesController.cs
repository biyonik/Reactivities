using System.Net;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities;
using Reactivities.Domain;

namespace Reactivities.API.Controllers;

public class ActivitiesController: BaseApiController
{
    
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var activities = await Mediator.Send(new List.Query());
        return Ok(activities);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var activity = await Mediator.Send(new Details.Query{Id = id});
        if (activity == null)
        {
            return NotFound();
        }
        return Ok(activity);
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody]Activity activity)
    {
        await Mediator.Send(new Create.Command { Activity = activity });
        return StatusCode((int)HttpStatusCode.Created);
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] Activity activity)
    {
        await Mediator.Send(new Edit.Command { Activity = activity });
        return Ok();
    }

    [HttpDelete]
    public async Task<IActionResult> Delete(Guid id)
    {
        await Mediator.Send(new Delete.Command { Id = id });
        return NoContent();
    }
}