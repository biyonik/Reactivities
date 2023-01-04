using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Reactivities.API.DTOs.User;
using Reactivities.Application.Services.JWT;
using Reactivities.Domain;

namespace Reactivities.API.Controllers;

[ApiController]
[Route("api/v1/[controller]")]
[Produces("application/json")]
public class AccountController : ControllerBase
{
    private readonly UserManager<AppUser> _userManager;
    private readonly JwTokenService _tokenService;

    public AccountController(UserManager<AppUser> userManager, JwTokenService tokenService)
    {
        _userManager = userManager;
        _tokenService = tokenService;
    }

    [HttpPost]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);
        if (user == null) return Unauthorized();
        
        var result = await _userManager.CheckPasswordAsync(user, loginDto.Password);
        if (result)
        {
            var token = _tokenService.CreateToken(user);
            return Ok(new UserListDto
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Image = null,
                Token = token
            });
        }

        return Unauthorized();

    }
}