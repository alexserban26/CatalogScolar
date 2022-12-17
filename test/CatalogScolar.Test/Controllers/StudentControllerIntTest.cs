
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
    public class StudentsControllerIntTest
    {
        public StudentsControllerIntTest()
        {
            _factory = new AppWebApplicationFactory<TestStartup>().WithMockUser();
            _client = _factory.CreateClient();

            _studentRepository = _factory.GetRequiredService<IStudentRepository>();


            InitTest();
        }

        private const string DefaultNume = "AAAAAAAAAA";
        private const string UpdatedNume = "BBBBBBBBBB";

        private const string DefaultMail = "AAAAAAAAAA";
        private const string UpdatedMail = "BBBBBBBBBB";

        private readonly AppWebApplicationFactory<TestStartup> _factory;
        private readonly HttpClient _client;
        private readonly IStudentRepository _studentRepository;

        private Student _student;


        private Student CreateEntity()
        {
            return new Student
            {
                Nume = DefaultNume,
                Mail = DefaultMail,
            };
        }

        private void InitTest()
        {
            _student = CreateEntity();
        }

        [Fact]
        public async Task CreateStudent()
        {
            var databaseSizeBeforeCreate = await _studentRepository.CountAsync();

            // Create the Student
            var response = await _client.PostAsync("/api/students", TestUtil.ToJsonContent(_student));
            response.StatusCode.Should().Be(HttpStatusCode.Created);

            // Validate the Student in the database
            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeCreate + 1);
            var testStudent = studentList.Last();
            testStudent.Nume.Should().Be(DefaultNume);
            testStudent.Mail.Should().Be(DefaultMail);
        }

        [Fact]
        public async Task CreateStudentWithExistingId()
        {
            var databaseSizeBeforeCreate = await _studentRepository.CountAsync();
            // Create the Student with an existing ID
            _student.Id = 1L;

            // An entity with an existing ID cannot be created, so this API call must fail
            var response = await _client.PostAsync("/api/students", TestUtil.ToJsonContent(_student));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Student in the database
            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeCreate);
        }

        [Fact]
        public async Task CheckNumeIsRequired()
        {
            var databaseSizeBeforeTest = await _studentRepository.CountAsync();

            // Set the field to null
            _student.Nume = null;

            // Create the Student, which fails.
            var response = await _client.PostAsync("/api/students", TestUtil.ToJsonContent(_student));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task CheckMailIsRequired()
        {
            var databaseSizeBeforeTest = await _studentRepository.CountAsync();

            // Set the field to null
            _student.Mail = null;

            // Create the Student, which fails.
            var response = await _client.PostAsync("/api/students", TestUtil.ToJsonContent(_student));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeTest);
        }

        [Fact]
        public async Task GetAllStudents()
        {
            // Initialize the database
            await _studentRepository.CreateOrUpdateAsync(_student);
            await _studentRepository.SaveChangesAsync();

            // Get all the studentList
            var response = await _client.GetAsync("/api/students?sort=id,desc");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.[*].id").Should().Contain(_student.Id);
            json.SelectTokens("$.[*].nume").Should().Contain(DefaultNume);
            json.SelectTokens("$.[*].mail").Should().Contain(DefaultMail);
        }

        [Fact]
        public async Task GetStudent()
        {
            // Initialize the database
            await _studentRepository.CreateOrUpdateAsync(_student);
            await _studentRepository.SaveChangesAsync();

            // Get the student
            var response = await _client.GetAsync($"/api/students/{_student.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            var json = JToken.Parse(await response.Content.ReadAsStringAsync());
            json.SelectTokens("$.id").Should().Contain(_student.Id);
            json.SelectTokens("$.nume").Should().Contain(DefaultNume);
            json.SelectTokens("$.mail").Should().Contain(DefaultMail);
        }

        [Fact]
        public async Task GetNonExistingStudent()
        {
            var maxValue = long.MaxValue;
            var response = await _client.GetAsync("/api/students/" + maxValue);
            response.StatusCode.Should().Be(HttpStatusCode.NotFound);
        }

        [Fact]
        public async Task UpdateStudent()
        {
            // Initialize the database
            await _studentRepository.CreateOrUpdateAsync(_student);
            await _studentRepository.SaveChangesAsync();
            var databaseSizeBeforeUpdate = await _studentRepository.CountAsync();

            // Update the student
            var updatedStudent = await _studentRepository.QueryHelper().GetOneAsync(it => it.Id == _student.Id);
            // Disconnect from session so that the updates on updatedStudent are not directly saved in db
            //TODO detach
            updatedStudent.Nume = UpdatedNume;
            updatedStudent.Mail = UpdatedMail;

            var response = await _client.PutAsync($"/api/students/{_student.Id}", TestUtil.ToJsonContent(updatedStudent));
            response.StatusCode.Should().Be(HttpStatusCode.OK);

            // Validate the Student in the database
            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeUpdate);
            var testStudent = studentList.Last();
            testStudent.Nume.Should().Be(UpdatedNume);
            testStudent.Mail.Should().Be(UpdatedMail);
        }

        [Fact]
        public async Task UpdateNonExistingStudent()
        {
            var databaseSizeBeforeUpdate = await _studentRepository.CountAsync();

            // If the entity doesn't have an ID, it will throw BadRequestAlertException
            var response = await _client.PutAsync("/api/students/1", TestUtil.ToJsonContent(_student));
            response.StatusCode.Should().Be(HttpStatusCode.BadRequest);

            // Validate the Student in the database
            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeUpdate);
        }

        [Fact]
        public async Task DeleteStudent()
        {
            // Initialize the database
            await _studentRepository.CreateOrUpdateAsync(_student);
            await _studentRepository.SaveChangesAsync();
            var databaseSizeBeforeDelete = await _studentRepository.CountAsync();

            var response = await _client.DeleteAsync($"/api/students/{_student.Id}");
            response.StatusCode.Should().Be(HttpStatusCode.NoContent);

            // Validate the database is empty
            var studentList = await _studentRepository.GetAllAsync();
            studentList.Count().Should().Be(databaseSizeBeforeDelete - 1);
        }

        [Fact]
        public void EqualsVerifier()
        {
            TestUtil.EqualsVerifier(typeof(Student));
            var student1 = new Student
            {
                Id = 1L
            };
            var student2 = new Student
            {
                Id = student1.Id
            };
            student1.Should().Be(student2);
            student2.Id = 2L;
            student1.Should().NotBe(student2);
            student1.Id = 0;
            student1.Should().NotBe(student2);
        }
    }
}
