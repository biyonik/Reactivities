﻿using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Reactivities.API.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class BaseApiController : ControllerBase
{
    private IMediator _mediator;

    protected IMediator Mediator => _mediator ??= 
        HttpContext.RequestServices.GetService<IMediator>();
}