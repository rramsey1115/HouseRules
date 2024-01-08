using HouseRules.Models;


public class ChoreDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public int Difficulty { get; set; }
    public int ChoreFrequencyDays { get; set; }
    public List<ChoreAssignmentDTO>? ChoreAssignments { get; set; }
    public List<ChoreCompletionDTO>? ChoreCompletions { get; set; }
    public bool Overdue
    {
        get
        {
            DateTime today = DateTime.Today;
            var overdue = false;

            if (ChoreCompletions == null || ChoreCompletions.Count == 0)
            {
                overdue = true;
                return overdue;
            }
            else
            {
                var dueDate = ChoreCompletions[0].CompletedOn.AddDays(ChoreFrequencyDays);
                if(dueDate < today)
                {
                    overdue = true;
                    return overdue;
                }
                return overdue;
            }
        }
    }
}