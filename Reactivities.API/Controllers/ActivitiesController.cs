using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Activities;
using Reactivities.Domain;

namespace Reactivities.API.Controllers;

public class ActivitiesController : BaseApiController
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return HandleResult(await Mediator!.Send(new List.Query()));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        return HandleResult(await Mediator!.Send(new Details.Query { Id = id }));
    }

    [HttpPost]
    public async Task<IActionResult> Add([FromBody] Activity activity)
    {
        return HandleResult(await Mediator!.Send(new Create.Command { Activity = activity }));
    }

    [HttpPut]
    public async Task<IActionResult> Edit([FromBody] Activity activity)
    {
        await Mediator!.Send(new Edit.Command { Activity = activity });
        return Ok();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        return HandleResult(await Mediator!.Send(new Delete.Command { Id = id }));
    }
}