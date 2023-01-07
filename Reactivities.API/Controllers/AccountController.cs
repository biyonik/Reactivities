using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Reactivities.API.DTOs.User;
using Reactivities.Application.Constants.Message;
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

    [AllowAnonymous]
    [HttpPost("[action]")]
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

    [AllowAnonymous]
    [HttpPost("[action]")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
        {
            ModelState.AddModelError("Username", AccountMessageConstants.UserNameAlreadyTaken);
            // return ValidationProblem();
        } else if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
        {
            ModelState.AddModelError("Email", AccountMessageConstants.EmailAlreadyTaken);
            // return ValidationProblem();
        }

        if (ModelState.ErrorCount > 0)
        {
            return ValidationProblem(); 
        }

        var user = new AppUser
        {
            DisplayName = registerDto.DisplayName,
            Email = registerDto.Email,
            UserName = registerDto.Username,
            Bio = $"{registerDto.DisplayName}'s bio"
        };
        
        var result = await _userManager.CreateAsync(user, registerDto.Password);
        if (result.Succeeded)
        {
            return Ok(new UserListDto
            {
                DisplayName = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                Username = user.UserName
            });
        }

        return BadRequest(result.Errors);
    }

    [Authorize]
    [HttpGet("[action]")]
    public async Task<IActionResult> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
        if (user == null) return BadRequest(AccountMessageConstants.UserNotFound);
        return Ok(new UserListDto
        {
            DisplayName = user.DisplayName,
            Username = user.UserName,
            Image = null
        });
    }
}