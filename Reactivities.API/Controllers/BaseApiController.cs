using MediatR;
using Microsoft.AspNetCore.Mvc;
using Reactivities.Application.Core.Result.Abstract;
using Reactivities.Application.Core.Result.Concrete;

namespace Reactivities.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Produces("application/json")]
public class BaseApiController : ControllerBase
{
    private IMediator? _mediator;

    protected IMediator? Mediator => _mediator ??=
        HttpContext.RequestServices.GetService<IMediator>();

    protected ActionResult HandleResult<T>(IResult<T>? result)
    {
        if (result == null) return NotFound();
        
        if (result.IsSuccess && result.Value != null)
            return Ok(result.Value);
        if (result.IsSuccess && result.Value == null)
            return NotFound();
        return BadRequest(result.ErrorMessage);
    }
}