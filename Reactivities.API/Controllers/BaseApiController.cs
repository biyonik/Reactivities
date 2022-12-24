using Microsoft.AspNetCore.Mvc;

namespace Reactivities.API.Controllers;

[ApiController]
[Route("[controller]")]
[Produces("application/json")]
public class BaseApiController : ControllerBase
{
}