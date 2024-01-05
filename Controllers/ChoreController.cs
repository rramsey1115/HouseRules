
using Microsoft.AspNetCore.Mvc;
using HouseRules.Data;
using Microsoft.AspNetCore.Authorization;
using HouseRules.Models;
using Microsoft.EntityFrameworkCore;
using HouseRules.Models.DTOs;
using Microsoft.Extensions.Configuration.UserSecrets;

namespace HouseRules.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoreController : ControllerBase
{
    private HouseRulesDbContext _dbContext;

    public ChoreController(HouseRulesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
        return Ok(_dbContext
        .Chores
        .Include(c => c.ChoreCompletions).ThenInclude(cp => cp.UserProfile)
        .Include(c => c.ChoreAssignments)
        .Select(c => new ChoreDTO
        {
            Id = c.Id,
            Name = c.Name,
            Difficulty = c.Difficulty,
            ChoreFrequencyDays = c.ChoreFrequencyDays,
            ChoreAssignments = c.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
            {
                Id = ca.Id,
                UserProfileId = ca.UserProfileId,
                ChoreId = ca.ChoreId
            }).ToList(),
            ChoreCompletions = c.ChoreCompletions.OrderByDescending(cp => cp.CompletedOn).Select(cp => new ChoreCompletionDTO
            {
                Id = cp.Id,
                UserProfileId = cp.UserProfileId,
                ChoreId = cp.ChoreId,
                CompletedOn = cp.CompletedOn
            }).ToList()
        }).ToList()
        );
    }

    [HttpGet("{id}")]
    [Authorize]
    public IActionResult GetById(int id)
    {
        var found = _dbContext.Chores
        .Include(c => c.ChoreCompletions).ThenInclude(cp => cp.UserProfile)
        .Include(c => c.ChoreAssignments).ThenInclude(ca => ca.UserProfile)
        .SingleOrDefault(c => c.Id == id);

        if (found == null)
        {
            return BadRequest("Matching chore.id not found");
        }

        return Ok(new ChoreDTO
        {
            Id = found.Id,
            Name = found.Name,
            Difficulty = found.Difficulty,
            ChoreFrequencyDays = found.ChoreFrequencyDays,
            ChoreAssignments = found.ChoreAssignments.Select(ca => new ChoreAssignmentDTO
            {
                Id = ca.Id,
                UserProfileId = ca.UserProfileId,
                UserProfile = new UserProfileDTO
                {
                    Id = ca.UserProfile.Id,
                    FirstName = ca.UserProfile.FirstName,
                    LastName = ca.UserProfile.LastName,
                    Address = ca.UserProfile.Address
                },
                ChoreId = ca.ChoreId
            }).ToList(),
            ChoreCompletions = found.ChoreCompletions.OrderByDescending(cp => cp.CompletedOn).Select(cp => new ChoreCompletionDTO
            {
                Id = cp.Id,
                UserProfileId = cp.UserProfileId,
                UserProfile = new UserProfileDTO
                {
                    Id = cp.UserProfile.Id,
                    FirstName = cp.UserProfile.FirstName,
                    LastName = cp.UserProfile.LastName,
                    Address = cp.UserProfile.Address
                },
                ChoreId = cp.ChoreId,
                CompletedOn = cp.CompletedOn
            }).ToList()
        });
    }

    [HttpPost("{id}/{userId}/complete")]
    [Authorize]
    public IActionResult Complete(int id, int userId)
    {
        var toAdd = new ChoreCompletion
        {
            UserProfileId = userId,
            ChoreId = id,
            CompletedOn = DateTime.Now
        };

        _dbContext.ChoreCompletions.Add(toAdd);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("create")]
    // [Authorize(Roles = "Admin")]
    public IActionResult Create(Chore c)
    {
        _dbContext.Chores.Add(c);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult Update(int id, Chore c)
    {
        Chore foundC = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (foundC == null)
        {
            return BadRequest("Id param does not match any chore id");
        }
        foundC.Name = c.Name;
        foundC.Difficulty = c.Difficulty;
        foundC.ChoreFrequencyDays = c.ChoreFrequencyDays;
        _dbContext.SaveChanges();
        return Created($"api/chore/{foundC.Id}", foundC);
    }

    [HttpDelete("{id}")]
    // [Authorize(Roles = "Admin")]
    public IActionResult Delete(int id)
    {
        Chore foundC = _dbContext.Chores.SingleOrDefault(c => c.Id == id);
        if (foundC == null)
        {
            return BadRequest("Id param does not match any chore id");
        }
        _dbContext.Chores.Remove(foundC);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("{id}/assign")]
    // [Authorize(Roles = "Admin")]
    public IActionResult Assign(int id, int userId)
    {
        var assignment = new ChoreAssignment
        {
            UserProfileId = userId,
            ChoreId = id
        };

        _dbContext.ChoreAssignments.Add(assignment);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPost("{id}/unassign")]
    // [Authorize(Roles = "Admin")]
    public IActionResult Unassign(int id, int userId)
    {
        var found = _dbContext.ChoreAssignments
        .Where(ca => ca.ChoreId == id && ca.UserProfileId == userId);

        foreach(var f in found)
        {
            _dbContext.ChoreAssignments.Remove(f);
        }
        
        _dbContext.SaveChanges();
        return NoContent();
    }

}
