using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using HouseRules.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models;
using Microsoft.AspNetCore.Identity;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UserProfileController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public UserProfileController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
            .UserProfiles
            .Include(up => up.IdentityUser)
            .Include(up => up.ChoreAssignments).ThenInclude(ca => ca.Chore)
            .Include(up => up.ChoreCompletions).ThenInclude(cc => cc.Chore)
            .Select(up => new UserProfileDTO
            {
                Id = up.Id,
                FirstName = up.FirstName,
                LastName = up.LastName,
                Address = up.Address,
                IdentityUserId = up.IdentityUserId,
                Email = up.IdentityUser.Email,
                UserName = up.IdentityUser.UserName,
                ChoreAssignments = up.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
                {
                    Id = ca.Id,
                    UserProfileId = ca.UserProfileId,
                    ChoreId = ca.ChoreId,
                    Chore = new ChoreDTO
                    {
                        Id = ca.Chore.Id,
                        Name = ca.Chore.Name,
                        Difficulty = ca.Chore.Difficulty,
                        ChoreFrequencyDays = ca.Chore.ChoreFrequencyDays
                    }
                }).ToList(),
                ChoreCompletions = up.ChoreCompletions.Select(cp => new ChoreCompletionDTO
                {
                    Id = cp.Id,
                    UserProfileId = cp.UserProfileId,
                    ChoreId = cp.ChoreId,
                    CompletedOn = cp.CompletedOn,
                    Chore = new ChoreDTO
                    {
                        Id = cp.Chore.Id,
                        Name = cp.Chore.Name,
                        Difficulty = cp.Chore.Difficulty,
                        ChoreFrequencyDays = cp.Chore.ChoreFrequencyDays
                    }
                }).ToList()
            })
        .ToList());
    }


    [HttpGet("withroles")]
    [Authorize(Roles = "Admin")]
    public IActionResult GetWithRoles()
    {
        return Ok(_dbContext.UserProfiles
        .Include(up => up.IdentityUser)
        .Select(up => new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            IdentityUserId = up.IdentityUserId,
            Roles = _dbContext.UserRoles
            .Where(ur => ur.UserId == up.IdentityUserId)
            .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
            .ToList()
        }));
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        var up = _dbContext
        .UserProfiles
        .Include(up => up.IdentityUser)
        .Include(up => up.ChoreAssignments).ThenInclude(ca => ca.Chore)
        .Include(up => up.ChoreCompletions).ThenInclude(cp => cp.Chore)
        .SingleOrDefault(up => up.Id == id);

        if (up == null)
        {
            return NotFound("Id doesn't exist on a userProfile");
        }

        return Ok(new UserProfileDTO
        {
            Id = up.Id,
            FirstName = up.FirstName,
            LastName = up.LastName,
            Address = up.Address,
            IdentityUserId = up.IdentityUserId,
            Email = up.IdentityUser.Email,
            UserName = up.IdentityUser.UserName,
            ChoreAssignments = up.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
            {
                Id = ca.Id,
                UserProfileId = ca.UserProfileId,
                ChoreId = ca.ChoreId,
                Chore = new ChoreDTO
                {
                    Id = ca.Chore.Id,
                    Name = ca.Chore.Name,
                    Difficulty = ca.Chore.Difficulty,
                    ChoreFrequencyDays = ca.Chore.ChoreFrequencyDays
                }
            }).ToList(),
            ChoreCompletions = up.ChoreCompletions.Select(cp => new ChoreCompletionDTO
            {
                Id = cp.Id,
                UserProfileId = cp.UserProfileId,
                ChoreId = cp.ChoreId,
                CompletedOn = cp.CompletedOn,
                Chore = new ChoreDTO
                {
                    Id = cp.Chore.Id,
                    Name = cp.Chore.Name,
                    Difficulty = cp.Chore.Difficulty,
                    ChoreFrequencyDays = cp.Chore.ChoreFrequencyDays
                }
            }).ToList()
        }

        );
    }

}