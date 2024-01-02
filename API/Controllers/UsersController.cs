using API.Data;
using API.Entites;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;


[Authorize]
public class UsersController : BaseApiController
{
    private readonly DataContext context;
    public UsersController(DataContext context)
    {
        this.context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
    {
        return await context.Users.ToListAsync();
    }


    [Authorize]
    [HttpGet("{id}")] // /api/users/:id

    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
        return await context.Users.FindAsync(id);
    }

}