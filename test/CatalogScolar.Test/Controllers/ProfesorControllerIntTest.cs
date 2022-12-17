
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
    public class ProfesorsControllerIntTest
    {
        public ProfesorsControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _profesorRepository = _factory.GetRequiredService<IProfesorRepository>();


            InitTest();
        }

        private const string DefaultNume = "AAAAAAAAAA";
        private const string UpdatedNume = "BBBBBBBBBB";

        private const string DefaultMail = "AAAAAAAAAA";
        private const string UpdatedMail = "BBBBBBBBBB";

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IProfesorRepository _profesorRepository;

        private Profesor _profesor;


        private Profesor CreateEntity()
        {
            return new Profesor
            {
                Nume = DefaultNume,
                Mail = DefaultMail,
            };
        }

        private void InitTest()
        {
            _profesor = CreateEntity();
        }

        [Fact]
        public async Task CreateProfesor()
        {
            var databaseSizeBeforeCreate = await _profesorRepository.CountAsync();

            // Create the Profesor
            var response = await _client.PostAsync("/api/profesors", TestUtil.ToJsonContent(_profesor));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Profesor in the database
            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testProfesor = profesorList.Last();
            testProfesor.Nume.Should().Be(DefaultNume);
            testProfesor.Mail.Should().Be(DefaultMail);
        }

        [Fact]
        public async Task CreateProfesorWithExistingId()
        {
            var databaseSizeBeforeCreate = await _profesorRepository.CountAsync();
            // Create the Profesor with an existing ID
            _profesor.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            var response = await _client.PostAsync("/api/profesors", TestUtil.ToJsonContent(_profesor));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Profesor in the database
            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckNumeIsRequired()
        {
            var databaseSizeBeforeTest = await _profesorRepository.CountAsync();

            // Set the field to null
            _profesor.Nume = null;

            // Create the Profesor, which fails.
            var response = await _client.PostAsync("/api/profesors", TestUtil.ToJsonContent(_profesor));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task CheckMailIsRequired()
        {
            var databaseSizeBeforeTest = await _profesorRepository.CountAsync();

            // Set the field to null
            _profesor.Mail = null;

            // Create the Profesor, which fails.
            var response = await _client.PostAsync("/api/profesors", TestUtil.ToJsonContent(_profesor));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllProfesors()
        {
            // Initialize the database
            await _profesorRepository.CreateOrUpdateAsync(_profesor);
            await _profesorRepository.SaveChangesAsync();

            // Get all the profesorList
            var response = await _client.GetAsync("/api/profesors?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_profesor.Id);
            json.SelectTokens("$.[*].nume").Should().Contain(DefaultNume);
            json.SelectTokens("$.[*].mail").Should().Contain(DefaultMail);
        }

        [Fact]
        public async Task GetProfesor()
        {
            // Initialize the database
            await _profesorRepository.CreateOrUpdateAsync(_profesor);
            await _profesorRepository.SaveChangesAsync();

            // Get the profesor
            var response = await _client.GetAsync($"/api/profesors/{_profesor.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_profesor.Id);
            json.SelectTokens("$.nume").Should().Contain(DefaultNume);
            json.SelectTokens("$.mail").Should().Contain(DefaultMail);
        }

        [Fact]
        public async Task GetNonExistingProfesor()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/profesors/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateProfesor()
        {
            // Initialize the database
            await _profesorRepository.CreateOrUpdateAsync(_profesor);
            await _profesorRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _profesorRepository.CountAsync();

            // Update the profesor
            var updatedProfesor = await _profesorRepository.QueryHelper().GetOneAsync(it => it.Id == _profesor.Id);
            // Disconnect from session so that the updates on updatedProfesor are not directly saved in db
            //TODO detach
            updatedProfesor.Nume = UpdatedNume;
            updatedProfesor.Mail = UpdatedMail;

            var response = await _client.PutAsync($"/api/profesors/{_profesor.Id}", TestUtil.ToJsonContent(updatedProfesor));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Profesor in the database
            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testProfesor = profesorList.Last();
            testProfesor.Nume.Should().Be(UpdatedNume);
            testProfesor.Mail.Should().Be(UpdatedMail);
        }

        [Fact]
        public async Task UpdateNonExistingProfesor()
        {
            var databaseSizeBeforeUpdate = await _profesorRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            var response = await _client.PutAsync("/api/profesors/1", TestUtil.ToJsonContent(_profesor));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Profesor in the database
            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteProfesor()
        {
            // Initialize the database
            await _profesorRepository.CreateOrUpdateAsync(_profesor);
            await _profesorRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _profesorRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/profesors/{_profesor.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);

            // Validate the database is empty
            var profesorList = await _profesorRepository.GetAllAsync();
            profesorList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Profesor));
            var profesor1 = new Profesor
            {
                Id = 1L
            };
            var profesor2 = new Profesor
            {
                Id = profesor1.Id
            };
            profesor1.Should().Be(profesor2);
            profesor2.Id = 2L;
            profesor1.Should().NotBe(profesor2);
            profesor1.Id = 0;
            profesor1.Should().NotBe(profesor2);
        }
    }
}
