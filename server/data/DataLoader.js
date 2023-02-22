import mongoose from "mongoose";

// Dummy data populate

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "Brandon",
    lastName: "Samuel",
    email: "brandon@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632584/profile_images/p1_yeimwn.jpg",
    friends: [],
    location: "San Fran, CA",
    occupation: "Software Engineer",
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  {
    _id: userIds[1],
    firstName: "Eric",
    lastName: "Galaz",
    email: "eric@gmail.com",
    password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632590/profile_images/p2_actzen.jpg",
    friends: [],
    location: "New York, CA",
    occupation: "Product Manager",
    createdAt: 1595589072,
    updatedAt: 1595589072,
    __v: 0,
  },
  {
    _id: userIds[2],
    firstName: "Theodore",
    lastName: "Fike",
    email: "theodore@gmail.com",
    password: "da39a3ee5e6b4b0d3255bfef95601890afd80709",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632576/profile_images/p3_erucna.jpg",
    friends: [],
    location: "Canada, CA",
    occupation: "UI / UX",
    createdAt: 1288090662,
    updatedAt: 1288090662,
    __v: 0,
  },
  {
    _id: userIds[3],
    firstName: "Leonard",
    lastName: "Carter",
    email: "leonard@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632574/profile_images/p4_aac0ja.jpg",
    friends: [],
    location: "Korea, CA",
    occupation: "Social Media Executive",
    createdAt: 1219214568,
    updatedAt: 1219214568,
    __v: 0,
  },
  {
    _id: userIds[4],
    firstName: "Elena",
    lastName: "Geier",
    email: "elena@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632586/profile_images/p5_jai5r7.jpg",
    friends: [],
    location: "Utah, CA",
    occupation: "Software Engineer",
    createdAt: 1493463661,
    updatedAt: 1493463661,
    __v: 0,
  },
  {
    _id: userIds[5],
    firstName: "Lynn",
    lastName: "Jeffery",
    email: "lynn@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632576/profile_images/p6_ohzfew.jpg",
    friends: [],
    location: "Los Angeles, CA",
    occupation: "Creative Designer",
    createdAt: 1381326073,
    updatedAt: 1381326073,
    __v: 0,
  },
  {
    _id: userIds[6],
    firstName: "Danita",
    lastName: "Vowel",
    email: "danita@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632590/profile_images/p7_zjmsib.jpg",
    friends: [],
    location: "Chicago, IL",
    occupation: "Social Media Executive",
    createdAt: 1714704324,
    updatedAt: 1642716557,
    __v: 0,
  },
  {
    _id: userIds[7],
    firstName: "Patricia",
    lastName: "Cope",
    email: "patricia@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632595/profile_images/p8_xyaqcu.jpg",
    friends: [],
    location: "Washington, DC",
    occupation: "Product Manager",
    createdAt: 1369908044,
    updatedAt: 1359322268,
    __v: 0,
  },
];

export const posts = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[1],
    firstName: "Eric",
    lastName: "Galaz",
    location: "New York, CA",
    description: "If you don't invest in the future and don't plant for the future, there won't be one",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/v1677632984/posts/post1_hyquj1.jpg",
    userPicturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632590/profile_images/p2_actzen.jpg",
    likes: new Map([
      [userIds[0], true],
      [userIds[2], true],
      [userIds[3], true],
      [userIds[4], true],
    ]),
    comments: [
      "comment 1",
      "comment 2",
      "comment 3",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[3],
    firstName: "Leonard",
    lastName: "Carter",
    location: "Korea, CA",
    description:
      "Social networks aren't about web sites. They're about experiences.",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/v1677632982/posts/post2_zvwq3j.jpg",
    userPicturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632574/profile_images/p4_aac0ja.jpg",
    likes: new Map([
      [userIds[7], true],
      [userIds[4], true],
      [userIds[1], true],
      [userIds[2], true],
    ]),
    comments: [
      "comment 1",
      "comment 2",
      "comment 3",
      "comment 4",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[4],
    firstName: "Elena",
    lastName: "Geier",
    location: "Utah, CA",
    description:
      "Hello World!!!",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/v1677632982/posts/post3_kdraqt.jpg",
    userPicturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632586/profile_images/p5_jai5r7.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
      [userIds[5], true],
    ]),
    comments: [
      "comment 1",
      "comment 2",
      "comment 3",
      "comment 4",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[5],
    firstName: "Lynn",
    lastName: "Jeffery",
    location: "Los Angeles, CA",
    description:
      "Colors!!!!.",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/v1677632983/posts/post4_gugqfj.jpg",
    userPicturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632576/profile_images/p6_ohzfew.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[6], true],
      [userIds[3], true],
    ]),
    comments: [
      "comment 1",
      "comment 2",
      "comment 3",
      "comment 4",
      "comment 5",
      "comment 6",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[6],
    firstName: "Danita",
    lastName: "Vowel",
    location: "Chicago, IL",
    description:
      "Likes === Happiness",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/v1677632983/posts/post5_whd0jt.jpg",
    userPicturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632590/profile_images/p7_zjmsib.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[3], true],
      [userIds[5], true],
      [userIds[7], true],
    ]),
    comments: [
      "comment 1",
      "comment 2",
      "comment 3",
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: userIds[7],
    firstName: "Patricia",
    lastName: "Cope",
    location: "Washington, DC",
    description:
      "Be stubborn on vision but flexible on details.",
    picturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/v1677632983/posts/post6_t8akqg.jpg",
    userPicturePath: "https://res.cloudinary.com/dltcon2kj/image/upload/c_scale,h_250/v1677632595/profile_images/p8_xyaqcu.jpg",
    likes: new Map([
      [userIds[1], true],
      [userIds[2], true],
    ]),

    comments: [
      "comment 1",
    ],
  },
];