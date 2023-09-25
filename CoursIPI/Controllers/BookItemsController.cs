using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CoursIPI.Models.Context;
using CoursIPI.NewFolder;
using Microsoft.AspNetCore.Authorization;

namespace CoursIPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookItemsController : ControllerBase
    {
        private readonly BookContext _context;

        public BookItemsController(BookContext context)
        {
            _context = context;
        }

        // GET: api/BookItems
        [HttpGet]
        //[Authorize]
        public async Task<ActionResult<IEnumerable<BookItem>>> GetBookItems()
        {
          if (_context.BookItems == null)
          {
              return NotFound();
          }
            return await _context.BookItems.ToListAsync();
        }

        // GET: api/BookItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BookItem>> GetBookItems(long id)
        {
          if (_context.BookItems == null)
          {
              return NotFound();
          }
            var bookItems = await _context.BookItems.FindAsync(id);

            if (bookItems == null)
            {
                return NotFound();
            }

            return bookItems;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutBookItems(long id, BookItem bookItems)
        {
            if (id != bookItems.Id)
            {
                return BadRequest();
            }

            _context.Entry(bookItems).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BookItemsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/BookItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<BookItem>> PostBookItems(BookItem todoItems)
        {
          if (_context.BookItems == null)
          {
              return Problem("Entity set 'BookContext.BookItems'  is null.");
          }
            _context.BookItems.Add(todoItems);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetBookItems", new { id = todoItems.Id }, todoItems);
        }

        // DELETE: api/BookItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBookItems(long id)
        {
            if (_context.BookItems == null)
            {
                return NotFound();
            }
            var todoItems = await _context.BookItems.FindAsync(id);
            if (todoItems == null)
            {
                return NotFound();
            }

            _context.BookItems.Remove(todoItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool BookItemsExists(long id)
        {
            return (_context.BookItems?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
