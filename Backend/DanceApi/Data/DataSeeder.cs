using DanceApi.Models;
using DanceApi.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace DanceApi.Data
{
    public static class DataSeeder
    {
        public static async Task SeedAsync(ApplicationDbContext context)
        {
            //remove old data then seed:
            context.Users.RemoveRange(context.Users);
            context.Classes.RemoveRange(context.Classes);
            context.Lectures.RemoveRange(context.Lectures);

            //if you have old data, do not seed:
            //if (await context.Users.AnyAsync()) return;

            var adminUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "Admin",
                Email = "admin@gmail.com",
                Password = "admin",
                Role = Role.Admin
            };

            var regularUser = new User
            {
                Id = Guid.NewGuid(),
                Name = "Regular User",
                Email = "user@gmail.com",
                Password = "user",
                Role = Role.User
            };

            context.Users.Add(adminUser);
            context.Users.Add(regularUser);


            var danceClass1 = new DanceClass
            {
                Id = Guid.NewGuid(),
                Name = "Hip Hop Basics"
            };

            var danceClass2 = new DanceClass
            {
                Id = Guid.NewGuid(),
                Name = "Ballet Fundamentals"
            };

            var danceClass3 = new DanceClass
            {
                Id = Guid.NewGuid(),
                Name = "Contemporary Dance"
            };

            var danceClass4 = new DanceClass
            {
                Id = Guid.NewGuid(),
                Name = "Salsa Basics"
            };

            var danceClass5 = new DanceClass
            {
                Id = Guid.NewGuid(),
                Name = "Jazz Dance Advanced"
            };

            context.Classes.Add(danceClass1);
            context.Classes.Add(danceClass2);
            context.Classes.Add(danceClass3);
            context.Classes.Add(danceClass4);
            context.Classes.Add(danceClass5);

            var lecture1 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Introduction to Hip Hop",
                Description = "Learn the basic moves and rhythm of Hip Hop dance.",
                DanceClassId = danceClass1.Id,
                DanceClass = danceClass1,
                PreparationVideoLink = "https://www.youtube.com/watch?v=ujREEgxEP7g&list=PL0m7UHzPZEA9R8Y6xautFgqeWnorDj2Le&index=5",
                LectionVideoLink = "https://www.youtube.com/watch?v=hHR-e_t-yCE"
            };

            var lecture2 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Basic Hip Hop Routine",
                Description = "Learn a simple Hip Hop routine.",
                DanceClassId = danceClass1.Id,
                DanceClass = danceClass1,
                PreparationVideoLink = "https://www.youtube.com/watch?v=mE81pTGee30&list=PL0m7UHzPZEA9R8Y6xautFgqeWnorDj2Le&index=7"
            };

            var lecture3 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Ballet: First Position",
                Description = "Introduction to the basic first position in Ballet.",
                DanceClassId = danceClass2.Id,
                DanceClass = danceClass2,
                PreparationVideoLink = "https://www.youtube.com/watch?v=FD6bB3Mz7q0&list=PLF_b5l-yeSmc9hTp95pK19U5gTq8bBn-0&index=1",
                LectionVideoLink = "https://www.youtube.com/watch?v=IBesu6wVsRs&list=PLF_b5l-yeSmc9hTp95pK19U5gTq8bBn-0&index=2"
            };

            var lecture4 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Ballet Barre Exercises",
                Description = "Basic Barre exercises for flexibility and strength.",
                DanceClassId = danceClass2.Id,
                DanceClass = danceClass2,
                PreparationVideoLink = "https://www.youtube.com/watch?v=4YA5ak1wV3A&list=PLF_b5l-yeSmc9hTp95pK19U5gTq8bBn-0&index=3"
            };

            var lecture5 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Contemporary Dance Basics",
                Description = "Introduction to contemporary dance techniques.",
                DanceClassId = danceClass3.Id,
                DanceClass = danceClass3,
                PreparationVideoLink = "https://www.youtube.com/watch?v=omiX9MSev5I",
                LectionVideoLink = "https://www.youtube.com/watch?v=-TJ2X4MVYN0"
            };

            var lecture6 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Jazz Dance Intro",
                Description = "Introduction to Jazz Dance.",
                DanceClassId = danceClass3.Id,
                DanceClass = danceClass5,
                PreparationVideoLink = "https://www.youtube.com/watch?v=Nq4DIqIyimw",
            };

            var lecture7 = new Lecture
            {
                Id = Guid.NewGuid(),
                Name = "Ballet Posture and Alignment",
                Description = "Learn proper body alignment and posture essential for ballet technique.",
                DanceClassId = danceClass2.Id,
                PreparationVideoLink = "https://www.youtube.com/watch?v=FjREp4ifPyc&list=PLF_b5l-yeSmc9hTp95pK19U5gTq8bBn-0&index=16",
                LectionVideoLink = "https://www.youtube.com/watch?v=iaO9cYYMEOE&list=PLF_b5l-yeSmc9hTp95pK19U5gTq8bBn-0&index=17"
            };

            context.Lectures.Add(lecture1);
            context.Lectures.Add(lecture2);
            context.Lectures.Add(lecture3);
            context.Lectures.Add(lecture4);
            context.Lectures.Add(lecture5);
            context.Lectures.Add(lecture6);
            context.Lectures.Add(lecture7);

            await context.SaveChangesAsync();
            Console.WriteLine("Data seeded successfully!");
        }
    }
}
