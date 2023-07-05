using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using CoffeeShop.Models;
using CoffeeShop.Repositories;

namespace CoffeeShop.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CoffeeController : ControllerBase
    {
        private readonly ICoffeeRepository _coffeeRepository;

        public CoffeeController(ICoffeeRepository coffeeRepository)
        {
            _coffeeRepository = coffeeRepository;
        }

        // https://localhost:5001/api/coffee/
        [HttpGet]
        public ActionResult Get()
        {
            return Ok(_coffeeRepository.GetAll());
        }

        // https://localhost:5001/api/coffee/5
        [HttpGet("{id}")]
        public ActionResult Get(int id)
        {
            var coffee = _coffeeRepository.Get(id);
            if (coffee == null)
            {
                return NotFound();
            }
            return Ok(coffee);
        }

        // https://localhost:5001/api/coffee/
        [HttpPost]
        public ActionResult Post(Coffee coffee)
        {
            _coffeeRepository.Add(coffee);
            return CreatedAtAction("Get", new { id = coffee.Id }, coffee);
        }

        // https://localhost:5001/api/coffee/5
        [HttpPut("{id}")]
        public ActionResult Put(int id, Coffee coffee)
        {
            if (id != coffee.Id)
            {
                return BadRequest();
            }

            _coffeeRepository.Update(coffee);
            return NoContent();
        }

        // https://localhost:5001/api/coffee/5
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
              _coffeeRepository.Delete(id);
            return NoContent();
        }
    }
}
