using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoursIPI.Models.Context;
using CoursIPI.NewFolder;

namespace CoursIPI.Controllers
{
    [Route("api/TacheDTO")]
    [ApiController]
    public class BookItemsControllerDTO : ControllerBase
    {
        private readonly BookContext _contextBook;

        public BookItemsControllerDTO(BookContext context)
        {
            _contextBook = context;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<BookItemDTO>>> GetBookItems()
        {
          if (_contextBook.BookItems == null)
          {
              return NotFound();
          }
            return await _contextBook.BookItems.Select(item => item.ToDTO()).ToListAsync();
             
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookItem>> GetBookItems(long id)
        {
          if (_contextBook.BookItems == null)
          {
              return NotFound();
          }
            var bookItem = await _contextBook.BookItems.FindAsync(id);

            if (bookItem == null)
            {
                return NotFound();
            }

            return bookItem;
        }


     
    }
}
