
namespace DanceApi.Models
{
    public class Lection
    {
        public Guid Id { get; set; }

        public required string Name { get; set; }

        public required Guid DanceClassId { get; set; }

        public virtual DanceClass DanceClass { get; set; }
    }
}