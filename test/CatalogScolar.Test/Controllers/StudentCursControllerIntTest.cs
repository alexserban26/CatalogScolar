
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
    public class StudentCursControllerIntTest
    {
        public StudentCursControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _studentCursRepository = _factory.GetRequiredService<IStudentCursRepository>();


            InitTest();
        }

        private static readonly int? DefaultNota = 1;
        private static readonly int? UpdatedNota = 2;

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IStudentCursRepository _studentCursRepository;

        private StudentCurs _studentCurs;


        private StudentCurs CreateEntity()
        {
            return new StudentCurs
            {
                Nota = DefaultNota,
            };
        }

        private void InitTest()
        {
            _studentCurs = CreateEntity();
        }

        [Fact]
        public async Task CreateStudentCurs()
        {
            var databaseSizeBeforeCreate = await _studentCursRepository.CountAsync();

            // Create the StudentCurs
            var response = await _client.PostAsync("/api/student-curs", TestUtil.ToJsonContent(_studentCurs));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the StudentCurs in the database
            var studentCursList = await _studentCursRepository.GetAllAsync();
            studentCursList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testStudentCurs = studentCursList.Last();
            testStudentCurs.Nota.Should().Be(DefaultNota);
        }

        [Fact]
        public async Task CreateStudentCursWithExistingId()
        {
            var databaseSizeBeforeCreate = await _studentCursRepository.CountAsync();
            // Create the StudentCurs with an existing ID
            _studentCurs.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            var response = await _client.PostAsync("/api/student-curs", TestUtil.ToJsonContent(_studentCurs));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the StudentCurs in the database
            var studentCursList = await _studentCursRepository.GetAllAsync();
            studentCursList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckNotaIsRequired()
        {
            var databaseSizeBeforeTest = await _studentCursRepository.CountAsync();

            // Set the field to null
            _studentCurs.Nota = null;

            // Create the StudentCurs, which fails.
            var response = await _client.PostAsync("/api/student-curs", TestUtil.ToJsonContent(_studentCurs));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var studentCursList = await _studentCursRepository.GetAllAsync();
            studentCursList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllStudentCurs()
        {
            // Initialize the database
            await _studentCursRepository.CreateOrUpdateAsync(_studentCurs);
            await _studentCursRepository.SaveChangesAsync();

            // Get all the studentCursList
            var response = await _client.GetAsync("/api/student-curs?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_studentCurs.Id);
            json.SelectTokens("$.[*].nota").Should().Contain(DefaultNota);
        }

        [Fact]
        public async Task GetStudentCurs()
        {
            // Initialize the database
            await _studentCursRepository.CreateOrUpdateAsync(_studentCurs);
            await _studentCursRepository.SaveChangesAsync();

            // Get the studentCurs
            var response = await _client.GetAsync($"/api/student-curs/{_studentCurs.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_studentCurs.Id);
            json.SelectTokens("$.nota").Should().Contain(DefaultNota);
        }

        [Fact]
        public async Task GetNonExistingStudentCurs()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/student-curs/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateStudentCurs()
        {
            // Initialize the database
            await _studentCursRepository.CreateOrUpdateAsync(_studentCurs);
            await _studentCursRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _studentCursRepository.CountAsync();

            // Update the studentCurs
            var updatedStudentCurs = await _studentCursRepository.QueryHelper().GetOneAsync(it => it.Id == _studentCurs.Id);
            // Disconnect from session so that the updates on updatedStudentCurs are not directly saved in db
            //TODO detach
            updatedStudentCurs.Nota = UpdatedNota;

            var response = await _client.PutAsync($"/api/student-curs/{_studentCurs.Id}", TestUtil.ToJsonContent(updatedStudentCurs));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the StudentCurs in the database
            var studentCursList = await _studentCursRepository.GetAllAsync();
            studentCursList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testStudentCurs = studentCursList.Last();
            testStudentCurs.Nota.Should().Be(UpdatedNota);
        }

        [Fact]
        public async Task UpdateNonExistingStudentCurs()
        {
            var databaseSizeBeforeUpdate = await _studentCursRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            var response = await _client.PutAsync("/api/student-curs/1", TestUtil.ToJsonContent(_studentCurs));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the StudentCurs in the database
            var studentCursList = await _studentCursRepository.GetAllAsync();
            studentCursList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteStudentCurs()
        {
            // Initialize the database
            await _studentCursRepository.CreateOrUpdateAsync(_studentCurs);
            await _studentCursRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _studentCursRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/student-curs/{_studentCurs.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);

            // Validate the database is empty
            var studentCursList = await _studentCursRepository.GetAllAsync();
            studentCursList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(StudentCurs));
            var studentCurs1 = new StudentCurs
            {
                Id = 1L
            };
            var studentCurs2 = new StudentCurs
            {
                Id = studentCurs1.Id
            };
            studentCurs1.Should().Be(studentCurs2);
            studentCurs2.Id = 2L;
            studentCurs1.Should().NotBe(studentCurs2);
            studentCurs1.Id = 0;
            studentCurs1.Should().NotBe(studentCurs2);
        }
    }
}
