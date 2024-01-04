
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
            ChoreCompletions = c.ChoreCompletions.Select(cp => new ChoreCompletionDTO
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
        .Include(c => c.ChoreAssignments)
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
                ChoreId = ca.ChoreId
            }).ToList(),
            ChoreCompletions = found.ChoreCompletions.Select(cp => new ChoreCompletionDTO
            {
                Id = cp.Id,
                UserProfileId = cp.UserProfileId,
                ChoreId = cp.ChoreId,
                CompletedOn = cp.CompletedOn
            }).ToList()
        });
    }

    [HttpPost("{id}/complete")]
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

    [HttpPost]
    // [Authorize(Roles = "Admin")]
    public IActionResult Create(Chore c)
    {
        _dbContext.Chores.Add(c);
        _dbContext.SaveChanges();
        return Created($"api/chore/{c.Id}", c);
    }


}
