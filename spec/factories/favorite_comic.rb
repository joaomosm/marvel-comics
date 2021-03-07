FactoryBot.define do
  factory :favorite_comic do
    comic_id { Faker::Number.number(digits: 6) }
    title { Faker::Movie.title }
  end
end