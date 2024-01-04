using HouseRules.Models;


public class ChoreDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreCompletionDTO>? ChoreCompletions { get; set; }
}