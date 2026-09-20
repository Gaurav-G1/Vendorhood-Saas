package com.vendorhood.backend;

import com.vendorhood.backend.config.TenantContext;
import com.vendorhood.backend.domain.Order;
import com.vendorhood.backend.domain.Product;
import com.vendorhood.backend.domain.Vendor;
import com.vendorhood.backend.repository.OrderRepository;
import com.vendorhood.backend.repository.ProductRepository;
import com.vendorhood.backend.repository.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BackendApplication {

    public static void main(String[] resignation) {
        SpringApplication.run(BackendApplication.class, resignation);
    }

    @Bean
    public CommandLineRunner initDatabase(
            VendorRepository vendorRepository,
            ProductRepository productRepository,
            OrderRepository orderRepository) {
        return args -> {
            if (vendorRepository.count() == 0) {
                // Initialize default vendors (global database scope)
                Vendor v1 = Vendor.builder().id("v1").name("TechPulse Core").subdomain("techpulse").customDomain("www.techpulse.io").templateId(2).commissionRate(5.0).logoUrl("https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=60").build();
                Vendor v2 = Vendor.builder().id("v2").name("Flora & Herb Co.").subdomain("flora").customDomain("www.floraherb.com").templateId(5).commissionRate(7.5).logoUrl("https://images.unsplash.com/photo-1544816155-12df9643f363?w=120&auto=format&fit=crop&q=60").build();
                Vendor v3 = Vendor.builder().id("v3").name("StreetKicks").subdomain("kicks").customDomain("www.streetkicks.in").templateId(4).commissionRate(10.0).logoUrl("https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=120&auto=format&fit=crop&q=60").build();
                Vendor v4 = Vendor.builder().id("v4").name("Bharat Bazaar").subdomain("bharat").customDomain("www.bharatbazaar.in").templateId(3).commissionRate(6.0).logoUrl("https://images.unsplash.com/photo-1596797038530-2c107229654b?w=120&auto=format&fit=crop&q=60").build();
                Vendor v5 = Vendor.builder().id("v5").name("Jaipur Silks").subdomain("jaipur").customDomain("www.jaipursilks.com").templateId(1).commissionRate(8.0).logoUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&auto=format&fit=crop&q=60").build();

                vendorRepository.save(v1);
                vendorRepository.save(v2);
                vendorRepository.save(v3);
                vendorRepository.save(v4);
                vendorRepository.save(v5);

                // Initialize TechPulse Core products (v1) - 10 items
                TenantContext.setCurrentTenant("v1");
                productRepository.save(Product.builder().id("p1").name("CyberWatch Pro").price(29999.0).description("A futuristic smartwatch with neural health monitoring and holographic display.").imageUrl("https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60").stock(45).build());
                productRepository.save(Product.builder().id("p2").name("PulseBuds ANC").price(14999.0).description("Active noise-canceling wireless earbuds with ultra-low latency and spatial audio.").imageUrl("https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop&q=60").stock(120).build());
                productRepository.save(Product.builder().id("p3").name("Nexus Keyboard").price(18900.0).description("Hot-swappable optical mechanical keyboard with full custom RGB lighting profiles.").imageUrl("https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&auto=format&fit=crop&q=60").stock(15).build());
                productRepository.save(Product.builder().id("p21").name("Orion VR Headset").price(49999.0).description("Wireless standalone mixed reality headset with high-density micro-OLED lenses.").imageUrl("https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=500&auto=format&fit=crop&q=60").stock(15).build());
                productRepository.save(Product.builder().id("p22").name("VoltStand 3-in-1").price(3999.0).description("MagSafe compatible magnetic wireless charging stand for phone, watch, and pods.").imageUrl("https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60").stock(85).build());
                productRepository.save(Product.builder().id("p23").name("PrimeFlow Cable").price(999.0).description("Ultra-durable braided liquid silicone USB-C to USB-C cable supporting 100W PD.").imageUrl("https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop&q=60").stock(200).build());
                productRepository.save(Product.builder().id("p24").name("ApexMouse Wireless").price(8900.0).description("Ergonomic wireless gaming mouse featuring a 26K DPI optical sensor and optical switches.").imageUrl("https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&auto=format&fit=crop&q=60").stock(40).build());
                productRepository.save(Product.builder().id("p25").name("SoundBar Pro").price(15999.0).description("Sleek under-monitor soundbar with Dolby Atmos virtual surround sound technology.").imageUrl("https://images.unsplash.com/photo-1545454675-3531b543be5d?w=500&auto=format&fit=crop&q=60").stock(25).build());
                productRepository.save(Product.builder().id("p26").name("NanoCharger 65W").price(2499.0).description("Compact GaN dual-port wall charger for phone, tablet, and ultra-light laptops.").imageUrl("https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=500&auto=format&fit=crop&q=60").stock(150).build());
                productRepository.save(Product.builder().id("p27").name("Lumina Desk Light").price(4500.0).description("Smart LED desk bar with auto-dimming sensor and ambient rear backlights.").imageUrl("https://images.unsplash.com/photo-1507646227500-4d389b0012be?w=500&auto=format&fit=crop&q=60").stock(60).build());

                // Initialize Flora & Herb Co. products (v2) - 10 items
                TenantContext.setCurrentTenant("v2");
                productRepository.save(Product.builder().id("p4").name("Organic Lavender Oil").price(1200.0).description("100% pure organic lavender essential oil for relaxation, sleep, and wellness.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").stock(75).build());
                productRepository.save(Product.builder().id("p5").name("Eucalyptus Mist Spray").price(850.0).description("Refreshing aromatherapy mist spray distilled from wild organic eucalyptus leaves.").imageUrl("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60").stock(60).build());
                productRepository.save(Product.builder().id("p6").name("Organic Mint Balm").price(450.0).description("Soothing mint-infused balm made of organic shea butter and real spearmint extract.").imageUrl("https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60").stock(110).build());
                productRepository.save(Product.builder().id("p28").name("Rosewater Hydrosol").price(950.0).description("Steam-distilled organic rose damascena water toner for refreshing face mist.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").stock(90).build());
                productRepository.save(Product.builder().id("p29").name("Herbal Clay Mask").price(1450.0).description("Deep-cleansing French green clay mask infused with neem, tea tree, and match powder.").imageUrl("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60").stock(50).build());
                productRepository.save(Product.builder().id("p30").name("Tea Tree Soap Bar").price(350.0).description("Cold-pressed natural tea tree oil soap bar for clarifying acne-prone skin.").imageUrl("https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=500&auto=format&fit=crop&q=60").stock(150).build());
                productRepository.save(Product.builder().id("p31").name("Citrus Body Scrub").price(1100.0).description("Exfoliating brown sugar scrub scented with organic sweet orange and grapefruit peels.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").stock(80).build());
                productRepository.save(Product.builder().id("p32").name("Aloe Vera Gel").price(490.0).description("99% pure cold-pressed aloe vera gel for skin cooling, sunburns, and hair masks.").imageUrl("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60").stock(120).build());
                productRepository.save(Product.builder().id("p33").name("Rosemary Hair Serum").price(1650.0).description("Nourishing rosemary and bhringraj infused oil to stimulate scalp and strengthen hair.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").stock(70).build());
                productRepository.save(Product.builder().id("p34").name("Jasmine Night Cream").price(2200.0).description("Rich nocturnal repair moisturizer infused with pure jasmine extract and hyaluronic acid.").imageUrl("https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=60").stock(40).build());

                // Initialize StreetKicks products (v3) - 10 items
                TenantContext.setCurrentTenant("v3");
                productRepository.save(Product.builder().id("p7").name("Air Jordan 1 'Chicago'").price(18500.0).description("The iconic high-top classic. Full-grain leather, rubber cupsole, encapsulated Air cushioning.").imageUrl("https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format&fit=crop&q=60").sizePreview("7,8,9,10,11").isTrending(true).isLimited(false).isStreetwear(false).stock(12).build());
                productRepository.save(Product.builder().id("p8").name("Nike Dunk Low 'Panda'").price(10500.0).description("Classic two-tone basketball silhouette. Clean black-and-white leather construction.").imageUrl("https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&auto=format&fit=crop&q=60").sizePreview("6,7,8,9,10").isTrending(false).isLimited(true).isStreetwear(false).stock(24).build());
                productRepository.save(Product.builder().id("p9").name("Yeezy Boost 350 'Carbon'").price(24500.0).description("Reengineered Primeknit upper, translucent monofilament side stripe, full-length Boost midsole.").imageUrl("https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&auto=format&fit=crop&q=60").sizePreview("8,9,10,11").isTrending(true).isLimited(false).isStreetwear(false).stock(8).build());
                productRepository.save(Product.builder().id("p35").name("Retro Hoodie Black").price(4500.0).description("Heavyweight 450GSM organic cotton oversized hoodie with dropped shoulders.").imageUrl("https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&auto=format&fit=crop&q=60").sizePreview("S,M,L,XL").isTrending(false).isLimited(false).isStreetwear(true).stock(35).build());
                productRepository.save(Product.builder().id("p36").name("Cargo Pants Olive").price(3800.0).description("Ripstop cotton military cargo pants with double knee reinforcements and cinch tabs.").imageUrl("https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&auto=format&fit=crop&q=60").sizePreview("30,32,34,36").isTrending(false).isLimited(false).isStreetwear(true).stock(45).build());
                productRepository.save(Product.builder().id("p37").name("Graphic Tee White").price(1900.0).description("260GSM boxy graphic tee featuring screenprinted hand-drawn conceptual artwork.").imageUrl("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&auto=format&fit=crop&q=60").sizePreview("S,M,L,XL").isTrending(false).isLimited(false).isStreetwear(true).stock(100).build());
                productRepository.save(Product.builder().id("p38").name("Air Force 1 'Triple White'").price(9500.0).description("The definitive retro sneaker. Full-grain white leather upper with classic cupsole.").imageUrl("https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&auto=format&fit=crop&q=60").sizePreview("7,8,9,10,11").isTrending(true).isLimited(false).isStreetwear(false).stock(50).build());
                productRepository.save(Product.builder().id("p39").name("New Balance 550 'White Green'").price(12500.0).description("80s retro basketball low-top. Premium leather panels with forest green accents.").imageUrl("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=500&auto=format&fit=crop&q=60").sizePreview("8,9,10,11").isTrending(true).isLimited(false).isStreetwear(false).stock(15).build());
                productRepository.save(Product.builder().id("p40").name("Suede Cap Grey").price(1500.0).description("6-panel cap constructed from premium short-nap cow suede with adjustable strap.").imageUrl("https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=500&auto=format&fit=crop&q=60").sizePreview("OS").isTrending(false).isLimited(false).isStreetwear(true).stock(60).build());
                productRepository.save(Product.builder().id("p41").name("Kith Crewneck Grey").price(6500.0).description("Limited release heavyweight double-knit crewneck featuring embroidered chest logo.").imageUrl("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60").hoverImageUrl("https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=500&auto=format&fit=crop&q=60").sizePreview("S,M,L").isTrending(false).isLimited(true).isStreetwear(true).stock(10).build());

                // Initialize Bharat Bazaar products (v4) - 10 items
                TenantContext.setCurrentTenant("v4");
                productRepository.save(Product.builder().id("p10").name("Pragati Turmeric Powder").price(240.0).description("Bright, zesty heirloom turmeric containing over 5.2% curcumin. Perfect for immunity and lattes.").imageUrl("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60").isBestSeller(true).origin("Sangli, Maharashtra").weight("75g").cuisine("Indian").stock(150).build());
                productRepository.save(Product.builder().id("p11").name("Tellicherry Black Pepper").price(380.0).description("Sun-dried vine-ripened black peppercorns with a bold, complex citrus and wood aroma.").imageUrl("https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60").isBestSeller(true).origin("Wayanad, Kerala").weight("100g").cuisine("Indian").stock(80).build());
                productRepository.save(Product.builder().id("p12").name("Green Cardamom Pods").price(450.0).description("Hand-harvested jumbo green cardamom pods containing essential aromatic sweet oils.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").isBestSeller(false).origin("Idukki, Kerala").weight("50g").cuisine("Desserts").stock(200).build());
                productRepository.save(Product.builder().id("p18").name("Kashmiri Saffron (Grade A)").price(1450.0).description("Generations-farmed crimson stigma threads. Sourced directly from local Kashmiri growers.").imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60").isBestSeller(true).origin("Pampore, Kashmir").weight("5g").cuisine("Royal").stock(25).build());
                productRepository.save(Product.builder().id("p19").name("Guntur Red Chilli Powder").price(210.0).description("High-heat, vibrant red chilli powder stone-ground to preserve deep pungent oils.").imageUrl("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60").isBestSeller(false).origin("Guntur, Andhra Pradesh").weight("120g").cuisine("Spicy").stock(110).build());
                productRepository.save(Product.builder().id("p20").name("Ceylon Cinnamon Quills").price(390.0).description("Bespoke thin-shaved organic cinnamon quills featuring a sweet, delicate wood spice profile.").imageUrl("https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60").isBestSeller(false).origin("Kumily, Kerala").weight("60g").cuisine("Baking").stock(65).build());
                productRepository.save(Product.builder().id("p42").name("Cloves Kanyakumari").price(320.0).description("Hand-sorted cloves harvested from trees growing in high altitude microclimates.").imageUrl("https://images.unsplash.com/photo-1596797038530-2c107229654b?w=500&auto=format&fit=crop&q=60").isBestSeller(false).origin("Kanyakumari, Tamil Nadu").weight("50g").cuisine("Spicy").stock(120).build());
                productRepository.save(Product.builder().id("p43").name("Fennel Seeds").price(180.0).description("Crisp green fennel seeds with a sweet, aromatic licorice-like herbal flavor profile.").imageUrl("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60").isBestSeller(false).origin("Jaipur, Rajasthan").weight("80g").cuisine("Desserts").stock(90).build());
                productRepository.save(Product.builder().id("p44").name("Star Anise").price(290.0).description("Sun-dried whole star anise pods yielding a deep warm licorice base for stews and curries.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").isBestSeller(false).origin("Northeastern Hills").weight("40g").cuisine("Royal").stock(75).build());
                productRepository.save(Product.builder().id("p45").name("Coriander Seeds").price(160.0).description("Bright citrusy coriander seeds, dry-roasted and stone-ground to unlock warm nutty oils.").imageUrl("https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=500&auto=format&fit=crop&q=60").isBestSeller(true).origin("Indore, Madhya Pradesh").weight("100g").cuisine("Indian").stock(110).build());

                // Initialize Jaipur Silks products (v5) - 10 items
                TenantContext.setCurrentTenant("v5");
                productRepository.save(Product.builder().id("p13").name("Handcrafted Silk Saree").price(4500.0).description("Pure Banarasi silk saree with gold zari border and intricate embroidery.").imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60").stock(12).build());
                productRepository.save(Product.builder().id("p14").name("Embroidered Kurta Set").price(1850.0).description("Cotton ethnic kurta set with intricate hand embroidery.").imageUrl("https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&auto=format&fit=crop&q=60").stock(30).build());
                productRepository.save(Product.builder().id("p15").name("Jaipur Blue Pottery Vase").price(1200.0).description("Traditional hand-painted blue pottery floral vase from Jaipur.").imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60").stock(18).build());
                productRepository.save(Product.builder().id("p16").name("Block Print Cotton Bedsheet").price(2400.0).description("Premium hand-block printed double cotton bedsheet with matching pillow covers.").imageUrl("https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&auto=format&fit=crop&q=60").stock(22).build());
                productRepository.save(Product.builder().id("p17").name("Ethnic Leather Juttis").price(950.0).description("Hand-stitched mojari sandals made from genuine soft leather with traditional patterns.").imageUrl("https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=500&auto=format&fit=crop&q=60").stock(40).build());
                productRepository.save(Product.builder().id("p46").name("Silk Cushion Cover Set").price(1500.0).description("Set of 5 raw silk cushion covers with traditional gold piping and hidden zippers.").imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60").stock(40).build());
                productRepository.save(Product.builder().id("p47").name("Block Print Cotton Scarf").price(850.0).description("Lightweight mulmul cotton scarf featuring indigo hand-block printed patterns.").imageUrl("https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&auto=format&fit=crop&q=60").stock(75).build());
                productRepository.save(Product.builder().id("p48").name("Blue Pottery Serving Bowl").price(1800.0).description("Exquisite cobalt blue hand-glazed pottery bowl with intricate geometric flower design.").imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60").stock(15).build());
                productRepository.save(Product.builder().id("p49").name("Indigo Dabu Print Shirt").price(1650.0).description("Mens casual slim-fit shirt made of natural dabu mud-resist print indigo cotton.").imageUrl("https://images.unsplash.com/photo-1608748010899-18f300247112?w=500&auto=format&fit=crop&q=60").stock(30).build());
                productRepository.save(Product.builder().id("p50").name("Silk Hand-woven Dupatta").price(2800.0).description("Intricately hand-woven Chanderi silk dupatta with golden zari checks and bootis.").imageUrl("https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500&auto=format&fit=crop&q=60").stock(20).build());

                // Initialize default orders
                TenantContext.setCurrentTenant("v1");
                orderRepository.save(Order.builder().id("o1").customerName("Aarav Sharma").totalAmount(44998.0).platformCommission(2249.90).vendorShare(42748.10).date("2026-07-14").status("Delivered").build());

                TenantContext.setCurrentTenant("v2");
                orderRepository.save(Order.builder().id("o2").customerName("Priya Patel").totalAmount(2050.0).platformCommission(153.75).vendorShare(1896.25).date("2026-07-15").status("Pending").build());

                TenantContext.setCurrentTenant("v3");
                orderRepository.save(Order.builder().id("o3").customerName("Rajesh Kumar").totalAmount(8500.0).platformCommission(850.00).vendorShare(7650.00).date("2026-07-15").status("Return Requested").build());

                TenantContext.clear();
                System.out.println(">>> Multi-Tenant database populated successfully! <<<");
            }
        };
    }
}
