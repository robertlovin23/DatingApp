using System.ComponentModel.DataAnnotations.Schema;
using API.Entites;

namespace API.Entites;


[Table("Photos")]
public class Photos
{
    public int Id { get; set; }

    public string Url { get; set; }

    public bool IsMain { get; set; }

    public string PublicId { get; set; }

    public int AppUserId { get; set; }

    public AppUser AppUser { get; set; }
}