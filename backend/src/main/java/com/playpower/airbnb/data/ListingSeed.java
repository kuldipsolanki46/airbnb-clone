package com.playpower.airbnb.data;

import com.playpower.airbnb.model.ListingModels.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * Seed catalogue using the same listing photos as the reference page
 * (served from the frontend /images folder — original React code, matched assets).
 */
@Component
public class ListingSeed {

    private static String img(String file) {
        return "/images/" + file;
    }

    private final Listing listing;

    public ListingSeed() {
        Map<String, List<Photo>> byCat = new LinkedHashMap<>();

        // Living room 1 — patio / lounge (matches reference hero + tour)
        add(byCat, "Living room 1", "2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg", "Outdoor lounge with rattan chairs and stone feature wall", "Sofa", "Air conditioning", "Ceiling fan", "TV");
        add(byCat, "Living room 1", "090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg", "Patio seating area", "Sofa", "TV");
        add(byCat, "Living room 1", "f6de1663-4e9c-4414-b63b-29a154a92ee1.jpeg", "Lounge detail", "Sofa", "Ceiling fan");
        add(byCat, "Living room 1", "34529829-a971-44d3-ac2f-90ea3678a34d.jpeg", "Living space", "Sofa", "Air conditioning");
        add(byCat, "Living room 1", "153aa732-4935-48b8-a6fe-b469b6af5efc.jpeg", "Open living area", "TV", "Ceiling fan");
        add(byCat, "Living room 1", "3c6e6809-1bb1-47a6-8e24-aff593e1c28f.jpeg", "Living room angle", "Sofa");
        add(byCat, "Living room 1", "a9831aeb-f441-44f5-a38f-4cf54e3f0fcf.jpeg", "Living room overview", "Sofa", "TV");

        // Living room 2 — jacuzzi / second lounge
        add(byCat, "Living room 2", "9be71047-fc52-438a-9270-75cb470f6752.jpeg", "Private jacuzzi on the wooden deck", "Ceiling fan", "Hot tub");
        add(byCat, "Living room 2", "a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg", "Jacuzzi corner", "Hot tub");
        add(byCat, "Living room 2", "f1da1c3d-0d10-481e-9b63-c71f9073f30b.jpeg", "Second living area", "Ceiling fan", "Hot tub");
        add(byCat, "Living room 2", "ddc853d7-e658-405c-bedc-8f31106c447e.jpeg", "Lounge by the jacuzzi", "Hot tub");

        // Full kitchen
        add(byCat, "Full kitchen", "56c44812-52c0-4481-90d8-101ec1f34c7a.jpeg", "Kitchen and dining", "Freezer", "Fridge", "Cooker", "Kettle", "Microwave");
        add(byCat, "Full kitchen", "1c827136-4a85-4fe0-8e69-3fd8ea19bb17.jpeg", "Kitchen worktop", "Blender", "Toaster", "Wine glasses", "Coffee", "Crockery and cutlery");
        add(byCat, "Full kitchen", "0622ab42-b851-4d55-9d9f-df3143bc5909.jpeg", "Kitchen detail", "Fridge", "Cooking basics");
        add(byCat, "Full kitchen", "a74e3c0b-3188-4442-9146-1cd4d6ea45df.jpeg", "Cooking space", "Cooker", "Microwave");
        add(byCat, "Full kitchen", "48a8ffbc-fbf7-4f84-bc29-ee400da3f08b.jpeg", "Kitchen shelves", "Crockery and cutlery");
        add(byCat, "Full kitchen", "3cf31697-f3f3-4c60-82c4-029acb119ae4.jpeg", "Breakfast nook", "Kettle", "Coffee");

        // Bedroom
        add(byCat, "Bedroom", "67c61c6f-6260-4809-9510-0360e58a345d.jpeg", "Bedroom with double bed and garden view", "Double bed", "Air conditioning", "Bed linen", "Ceiling fan");
        add(byCat, "Bedroom", "97c78f8a-5090-4663-aebc-ba4e13b47092.jpeg", "Bedroom detail", "Double bed", "Hangers", "Iron", "Room-darkening blinds");

        // Full bathroom
        add(byCat, "Full bathroom", "9aa8e65f-94ac-4ba0-9a10-9ec91e536d22.jpeg", "Bathroom with walk-in shower", "Hairdryer", "Hot water", "Shampoo", "Shower gel");
        add(byCat, "Full bathroom", "246bd88d-4dd6-4117-a401-02a36ebfcf16.jpeg", "Bathroom vanity", "Hairdryer", "Hot water");
        add(byCat, "Full bathroom", "4fede77d-7a71-446f-89e3-263af937f3fa.jpeg", "Bathroom fittings", "Shampoo", "Shower gel");
        add(byCat, "Full bathroom", "79f59adb-5a5f-4d6c-8109-1f01f4ca0d03.jpeg", "Shower detail", "Hot water");
        add(byCat, "Full bathroom", "f19d8c0a-1d88-42a4-9218-686d4f0db7e4.jpeg", "Bathroom overview", "Hairdryer");

        // Gym
        add(byCat, "Gym", "23ea6621-6f74-4baa-acea-2fd03e312b41.jpeg", "Residents' gym", "Gym", "Exercise equipment", "Air conditioning");
        add(byCat, "Gym", "5adfdf3e-d497-4efc-ab8c-fc559dab311e.jpeg", "Gym equipment", "Exercise equipment", "Ceiling fan");
        add(byCat, "Gym", "608748cd-6ee7-4a71-88a2-ba79d3ddba5a.jpeg", "Gym interior", "Gym");
        add(byCat, "Gym", "5b856fde-a393-41bf-b373-c9d02e64221f.jpeg", "Cardio area", "Exercise equipment");
        add(byCat, "Gym", "42befad7-fb29-473d-91db-b03e7a544d1d.jpeg", "Weights area", "Gym", "Ceiling fan");

        // Exterior
        add(byCat, "Exterior", "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg", "Apartment building exterior in Candolim", "Pool");
        add(byCat, "Exterior", "fc02f48f-a937-42c5-895d-f9cc3113d6ca.jpeg", "Building frontage", "Free parking");
        add(byCat, "Exterior", "929545d3-e241-46c0-8a70-c24531ce7b54.jpeg", "Residence exterior", "Pool");
        add(byCat, "Exterior", "8eb65a8b-e795-4870-b141-6f63b1be24ae.jpeg", "Evening exterior", "Free parking");

        // Pool
        add(byCat, "Pool", "70325367-cbae-4993-b560-18cd3f6edd53.jpeg", "Shared outdoor pool");
        add(byCat, "Pool", "cc7a56bd-242c-498a-9aef-0cffac619e54.jpeg", "Pool deck");
        add(byCat, "Pool", "30ad93b2-293f-494d-b645-626303c6cb93.jpeg", "Poolside loungers");
        add(byCat, "Pool", "9642a60d-e9de-4e1a-89c2-9ebd230f4a74.jpeg", "Pool at golden hour");
        add(byCat, "Pool", "b6599f26-d65c-4df0-baf2-ef18c82a86a3.jpeg", "Pool overview");
        add(byCat, "Pool", "dc01fd46-b119-48d3-a43b-f6c093e26eca.jpeg", "Poolside seating");
        add(byCat, "Pool", "fe37b80e-da8a-4225-b27b-dfbb5d763c01.jpeg", "Pool detail");
        add(byCat, "Pool", "3c90338e-86b4-423f-aae1-279e0ccc3a18.jpeg", "Pool evening");
        add(byCat, "Pool", "862d936c-0f34-4e50-af87-b519e2781d19.jpeg", "Pool palms");
        add(byCat, "Pool", "79addceb-8c2d-419b-80ff-e29af426a94c.jpeg", "Pool wide shot");

        // Additional
        add(byCat, "Additional photos", "a45feaa2-b607-4092-83ac-5fd4b2894959.jpeg", "Suite detail", "Wifi", "Workspace");

        List<PhotoGroup> tour = new ArrayList<>();
        List<Photo> all = new ArrayList<>();
        byCat.forEach((cat, photos) -> {
            tour.add(new PhotoGroup(cat, photos.get(0).tags(), List.copyOf(photos)));
            all.addAll(photos);
        });

        // Hero order mirrors the reference 5-up grid exactly.
        List<String> heroIds = List.of(
                "2367476f-11c4-4a14-a7c6-267be62c1d59.jpeg",
                "090d8b0b-b539-42c0-84f8-e1fb0cdf9a93.jpeg",
                "9be71047-fc52-438a-9270-75cb470f6752.jpeg",
                "67c61c6f-6260-4809-9510-0360e58a345d.jpeg",
                "c904e1ab-a39d-4ef0-bdea-8c0bd16b9e3d.jpeg");
        List<Photo> ordered = new ArrayList<>();
        for (String id : heroIds) {
            all.stream().filter(p -> p.src().endsWith(id)).findFirst().ifPresent(ordered::add);
        }
        all.stream().filter(p -> !ordered.contains(p)).forEach(ordered::add);

        this.listing = new Listing(
            "mirashya-ug10",
            "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10",
            "Entire serviced apartment in Candolim, India",
            "Candolim, Goa, India",
            3, 1, 1, 1, 4.95, 19, 5699, 28499,
            "2026-10-18", "2026-10-23", 2,
            "Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes! Stay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi for the perfect unwind. Enjoy high-speed WiFi, Smart TV, pet-friendly comfort, and stylish interiors. Just minutes from Candolim Beach, popular cafés, restaurants, and nightlife, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa.",
            "Plan Your Relaxing Holiday at Amor De Goa by Mirashya Homes!\n\nStay in this cozy 1BHK in the heart of Candolim, featuring a private jacuzzi for the perfect unwind. Enjoy high-speed WiFi, Smart TV, pet-friendly comfort, and stylish interiors. Just minutes from Candolim Beach, popular cafés, restaurants, and nightlife, it's ideal for couples seeking romance, relaxation, and a touch of luxury in North Goa.\n\nThe space\nA calm, design-led 1BHK with a sunlit living room, a fully equipped kitchen, a serene bedroom and a spa-style bathroom. Step out to the shared pool, work from the dedicated desk, or end the day in the jacuzzi as the Candolim sky turns gold.\n\nGuest access\nThe entire apartment is yours, plus the shared pool, gym and alfresco dining deck.\n\nOther things to note\nSelf check-in with building staff. Pets are welcome. Please keep music low after 10 pm so neighbours can enjoy the Goan susegad too.",
            List.of(
                "Outdoor entertainment|The pool and alfresco dining are great for summer trips.",
                "Designed for staying cool|Beat the heat with the A/C and ceiling fan.",
                "Self check-in|You can check in with the building staff."),
            new Host("Mirashya Homes",
                img("avatars/host.jpeg"),
                2, 4.68, 1463,
                "Response rate: 100%|Responds within an hour", "100%", "within an hour",
                List.of("Sharath", "Aman Dev Pahwa", "Maria Karen Priyanka", "Simran", "Pallavi", "Sanyukta", "Shruti", "Amisha"),
                List.of("Born in the 80s", "Where I went to school: NICMAR GOA")),
            List.copyOf(ordered), List.copyOf(tour),
            List.of(
                new AmenityGroup("Bathroom", List.of("Hairdryer", "Cleaning products", "Shampoo", "Hot water", "Shower gel", "Bathtub", "Bath essentials")),
                new AmenityGroup("Bedroom and laundry", List.of("Washing machine", "Hangars", "Bed linen", "Room-darkening blinds", "Iron", "Clothes storage", "Cot", "Extra pillows and blankets")),
                new AmenityGroup("Entertainment", List.of("TV", "Smart TV")),
                new AmenityGroup("Family", List.of("Cot", "Long-term stays allowed")),
                new AmenityGroup("Heating and cooling", List.of("Air conditioning", "Ceiling fan")),
                new AmenityGroup("Home safety", List.of("Exterior security cameras on property", "Carbon monoxide alarm", "Smoke alarm", "Fire extinguisher")),
                new AmenityGroup("Internet and office", List.of("Wifi", "Dedicated workspace")),
                new AmenityGroup("Kitchen and dining", List.of("Kitchen", "Freezer", "Fridge", "Blender", "Cooker", "Cooking basics", "Kettle", "Microwave", "Toaster", "Wine glasses", "Coffee", "Crockery and cutlery")),
                new AmenityGroup("Outdoor", List.of("Pool", "Hot tub", "Gym", "Exercise equipment", "Alfresco dining", "BBQ grill")),
                new AmenityGroup("Parking and facilities", List.of("Free parking on premises", "Pets allowed", "Self check-in", "Private entrance", "Cleaning available during stay"))),
            List.of("Kitchen", "Wifi", "Dedicated workspace", "Free parking on premises", "Pool", "Hot tub", "Pets allowed", "Exterior security cameras on property", "Carbon monoxide alarm", "Smoke alarm"),
            List.of(new RatingCategory("Cleanliness", 5.0), new RatingCategory("Accuracy", 5.0),
                    new RatingCategory("Check-in", 5.0), new RatingCategory("Communication", 5.0),
                    new RatingCategory("Location", 4.8), new RatingCategory("Value", 4.8)),
            List.of(new int[]{18, 0, 0}, new int[]{1, 0, 0}),
            reviews(), similar(),
            List.of("Bedroom|1 double bed", "Living room|1 sofa"));
    }

    private static int seq = 0;
    private static void add(Map<String, List<Photo>> map, String cat, String file, String alt, String... tags) {
        seq++;
        map.computeIfAbsent(cat, k -> new ArrayList<>())
           .add(new Photo("photo-" + seq, cat, img(file), alt, List.of(tags)));
    }

    private List<Review> reviews() {
        return List.of(
            new Review("r1", "Amit", img("avatars/rev1.jpeg"), "2 months on Airbnb", "1 week ago", "Very helpful and responsive team. Safe and peaceful stay. loved everything about the property.", false),
            new Review("r2", "Aheesh", img("avatars/rev2.jpeg"), "3 years on Airbnb", "2 weeks ago", "We had a wonderful stay. The apartment was clean, comfortable, and exactly as shown in the photos. The host was very responsive and helpful throughout our stay. We would definitely recommend this place and would love to stay here again.", false),
            new Review("r3", "Samiksha", img("avatars/rev3.jpeg"), "8 months on Airbnb", "May 2026", "the host nitish was really great help", false),
            new Review("r4", "Vedant", img("avatars/rev4.jpeg"), "4 years on Airbnb", "May 2026", "We had an amazing stay at this property in Goa! The entire home was spotless and exceptionally well-maintained, making us feel comfortable from the moment we arrived. The cleanliness standards were truly impressive, with every corner of the house looking fresh and pristine. The highlight of our stay was definitely the jacuzzi. It was clean, well-kept, and the perfect place to relax after a day of exploring Goa.", true),
            new Review("r5", "Vaibhav S", img("avatars/rev5.jpeg"), "3 years on Airbnb", "May 2026", "Great great experience living out there , can't expect more , will always look for it in the future and will recommend my friends too.", false),
            new Review("r6", "Mohd", img("avatars/co1.jpg"), "5 years on Airbnb", "May 2026", "Great place. Exactly as described in the listing.", false));
    }

    private List<SimilarStay> similar() {
        return List.of(
            new SimilarStay("s1", "Beautiful Studio with a view to die for", 23600, 4.91, img("similar/s1.jpeg")),
            new SimilarStay("s2", "NAQAB - 1bhk with private pool", 42218, 4.95, img("similar/s2.jpeg")),
            new SimilarStay("s3", "Greentique Luxury Flat with plunge pool, Calangute", 44506, 4.94, img("similar/s3.jpeg")),
            new SimilarStay("s4", "The Tropical Studio | 5 mins to Beach", 22824, 4.96, img("similar/s4.jpeg")),
            new SimilarStay("s5", "Luxury Casa Bella 1BHK with plunge pool, Calangute", 39942, 4.95, img("similar/s5.jpeg")),
            new SimilarStay("s6", "Kanso by Earthen Window | Jacuzzi | Terrace | Pool", 45648, 5.0, img("similar/s6.jpeg")),
            new SimilarStay("s7", "Luxury Apt | Private Pool | 6 Mins from Beach", 48786, 4.93, img("similar/s1.jpeg")),
            new SimilarStay("s8", "Serendipity Cottage - Calm Stay in Calangute-Baga.", 22824, 4.92, img("similar/s2.jpeg")));
    }

    public Listing listing() { return listing; }
}
