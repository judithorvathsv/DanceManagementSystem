namespace DanceApi.Models
{
    public class DanceClass
    {
        public Guid Id {get;set;}

        public required string Name {get; set;}        
        
        public List<Lection> Lections {get; set;} = [];
    }
}
