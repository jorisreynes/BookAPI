namespace CoursIPI.NewFolder
{
    public class BookItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Edition { get; set; }
        public string Description { get; set; }
        public string EAN { get; set; }
        public bool Read { get; set; }
        //public string Secret { get; set; }
    }

    public class BookItemDTO
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Author { get; set; }
        public string Edition { get; set; }
        public string Description { get; set; }
        public string EAN { get; set; }
        public bool Read { get; set; }
    }

    public static class TodoItemExtensions
    {
        public static BookItemDTO ToDTO(this BookItem item)
        {
            return new BookItemDTO
            {
                Id = item.Id,
                Name = item.Name,
                Author = item.Author,
                Edition = item.Edition,
                Description = item.Description,
                EAN = item.EAN,
                Read = item.Read,
            };
        }
    }
}
