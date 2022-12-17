
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using FluentAssertions;
using CatalogScolar.Infrastructure.Data;
using CatalogScolar.Domain.Entities;
using CatalogScolar.Domain.Repositories.Interfaces;
using CatalogScolar.Test.Setup;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json.Linq;
using Xunit;

namespace CatalogScolar.Test.Controllers
{
    public class CursControllerIntTest
    {
        public CursControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _cursRepository = _factory.GetRequiredService<ICursRepository>();


            InitTest();
        }

        private const string DefaultNume = "AAAAAAAAAA";
        private const string UpdatedNume = "BBBBBBBBBB";

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly ICursRepository _cursRepository;

        private Curs _curs;


        private Curs CreateEntity()
        {
            return new Curs
            {
                Nume = DefaultNume,
            };
        }

        private void InitTest()
        {
            _curs = CreateEntity();
        }

        [Fact]
        public async Task CreateCurs()
        {
            var databaseSizeBeforeCreate = await _cursRepository.CountAsync();

            // Create the Curs
            var response = await _client.PostAsync("/api/curs", TestUtil.ToJsonContent(_curs));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Curs in the database
            var cursList = await _cursRepository.GetAllAsync();
            cursList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testCurs = cursList.Last();
            testCurs.Nume.Should().Be(DefaultNume);
        }

        [Fact]
        public async Task CreateCursWithExistingId()
        {
            var databaseSizeBeforeCreate = await _cursRepository.CountAsync();
            // Create the Curs with an existing ID
            _curs.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            var response = await _client.PostAsync("/api/curs", TestUtil.ToJsonContent(_curs));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Curs in the database
            var cursList = await _cursRepository.GetAllAsync();
            cursList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckNumeIsRequired()
        {
            var databaseSizeBeforeTest = await _cursRepository.CountAsync();

            // Set the field to null
            _curs.Nume = null;

            // Create the Curs, which fails.
            var response = await _client.PostAsync("/api/curs", TestUtil.ToJsonContent(_curs));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var cursList = await _cursRepository.GetAllAsync();
            cursList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllCurs()
        {
            // Initialize the database
            await _cursRepository.CreateOrUpdateAsync(_curs);
            await _cursRepository.SaveChangesAsync();

            // Get all the cursList
            var response = await _client.GetAsync("/api/curs?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_curs.Id);
            json.SelectTokens("$.[*].nume").Should().Contain(DefaultNume);
        }

        [Fact]
        public async Task GetCurs()
        {
            // Initialize the database
            await _cursRepository.CreateOrUpdateAsync(_curs);
            await _cursRepository.SaveChangesAsync();

            // Get the curs
            var response = await _client.GetAsync($"/api/curs/{_curs.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_curs.Id);
            json.SelectTokens("$.nume").Should().Contain(DefaultNume);
        }

        [Fact]
        public async Task GetNonExistingCurs()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/curs/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateCurs()
        {
            // Initialize the database
            await _cursRepository.CreateOrUpdateAsync(_curs);
            await _cursRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _cursRepository.CountAsync();

            // Update the curs
            var updatedCurs = await _cursRepository.QueryHelper().GetOneAsync(it => it.Id == _curs.Id);
            // Disconnect from session so that the updates on updatedCurs are not directly saved in db
            //TODO detach
            updatedCurs.Nume = UpdatedNume;

            var response = await _client.PutAsync($"/api/curs/{_curs.Id}", TestUtil.ToJsonContent(updatedCurs));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Curs in the database
            var cursList = await _cursRepository.GetAllAsync();
            cursList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testCurs = cursList.Last();
            testCurs.Nume.Should().Be(UpdatedNume);
        }

        [Fact]
        public async Task UpdateNonExistingCurs()
        {
            var databaseSizeBeforeUpdate = await _cursRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            var response = await _client.PutAsync("/api/curs/1", TestUtil.ToJsonContent(_curs));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Curs in the database
            var cursList = await _cursRepository.GetAllAsync();
            cursList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteCurs()
        {
            // Initialize the database
            await _cursRepository.CreateOrUpdateAsync(_curs);
            await _cursRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _cursRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/curs/{_curs.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);

            // Validate the database is empty
            var cursList = await _cursRepository.GetAllAsync();
            cursList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Curs));
            var curs1 = new Curs
            {
                Id = 1L
            };
            var curs2 = new Curs
            {
                Id = curs1.Id
            };
            curs1.Should().Be(curs2);
            curs2.Id = 2L;
            curs1.Should().NotBe(curs2);
            curs1.Id = 0;
            curs1.Should().NotBe(curs2);
        }
    }
}
