-- Drop tables if they exist

DROP TABLE IF EXISTS public.review_entity CASCADE;
DROP TABLE IF EXISTS public.rent_entity CASCADE;
DROP TABLE IF EXISTS public.phone_entity CASCADE;
DROP TABLE IF EXISTS public.brand_entity CASCADE;
DROP TABLE IF EXISTS public.user_entity CASCADE;

-- Create tables

CREATE TABLE public.user_entity (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE public.phone_entity (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    "pricePerDay" INTEGER NOT NULL,
    stock INTEGER NOT NULL,
    "cameraSpecs" TEXT,
    "memorySpecs" VARCHAR(255),
    "screenSpecs" VARCHAR(255),
    "isLastGeneration" BOOLEAN NOT NULL,
    "isOnSale" BOOLEAN NOT NULL,
    "image" VARCHAR(255),
    "userId" UUID NOT NULL,
    FOREIGN KEY ("userId") REFERENCES public.user_entity(id)
);

CREATE TABLE public.brand_entity (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE public.rent_entity (
    id UUID PRIMARY KEY,
    "isActive" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "endDate" TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    "paymentMethod" VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    "telephoneNumber" VARCHAR(20) NOT NULL,
    "phoneId" UUID NOT NULL,
    "userId" UUID NOT NULL
);

CREATE TABLE public.review_entity (
    id UUID PRIMARY KEY,
    rating NUMERIC(3, 1) NOT NULL,
    text TEXT NOT NULL,
    "phoneId" UUID NOT NULL,
    "userId" UUID NOT NULL
);

-- Populate database

INSERT INTO
    public.user_entity (id, name, email, password)
VALUES
    (
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818',
        'Mariana Ruiz Giraldo',
        'marianaruizgiraldo@gmail.com',
        'Hola1234567890$'
    ),
    (
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818',
        'Federico Melo Barrero',
        'federicomelobarrero@gmail.com',
        'Pu$$yD1stroyer$'
    ),
    (
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818',
        'David Burgos Mendez',
        'lordburgos@gmail.com',
        'HastaPronto1234567890$'
    ),
    (
        '9cb0662e-ce15-41b9-8078-dbfc5cfe6818',
        'Santiago Martínez Novoa',
        'santimartinez@gmail.com',
        'Goodbay1234567890$'
    );

INSERT INTO
    public.phone_entity (
        id,
        name,
        "pricePerDay",
        stock,
        "cameraSpecs",
        "memorySpecs",
        "screenSpecs",
        "isLastGeneration",
        "isOnSale",
        "image",
        "userId"
    )
VALUES
    (
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        'Samsung Galaxy S22',
        32000,
        5,
        '24 mm, ƒ/1.7 aperture, optical image stabilization, Dual Pixel autofocus.',
        '256GB',
        '6.2‑inch (diagonal) Dynamic AMOLED display',
        TRUE,
        FALSE,
        'https://smselectronic.com/wp-content/uploads/2022/02/sm-s901_Negro_01.jpg',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        'Google Pixel 7',
        30000,
        8,
        '28 mm, ƒ/1.8 aperture, Dual Pixel phase detection autofocus, OIS.',
        '128GB',
        '6.0‑inch (diagonal) AMOLED display',
        FALSE,
        TRUE,
        'https://m.media-amazon.com/images/I/7173p0j-mbL.jpg',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        'OnePlus 10',
        34000,
        3,
        '23 mm, ƒ/1.9 aperture, laser autofocus, OIS.',
        '256GB',
        '6.4‑inch (diagonal) Fluid AMOLED display',
        TRUE,
        FALSE,
        'https://m.media-amazon.com/images/I/81qOD8EZTjL.jpg',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        'Xiaomi Mi 12',
        33000,
        6,
        '27 mm, ƒ/1.6 aperture, phase detection autofocus, 8-axis OIS.',
        '128GB',
        '6.5‑inch (diagonal) Super AMOLED display',
        FALSE,
        TRUE,
        'https://micelu.co/wp-content/uploads/2022/12/XIAOMI-12-NEGRO.jpg',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        'Samsung Galaxy Note 10',
        28000,
        10,
        '29 mm, ƒ/1.4 aperture, Dual Pixel autofocus, 5-axis OIS.',
        '64GB',
        '6.3‑inch (diagonal) Super AMOLED display',
        FALSE,
        TRUE,
        'https://m.media-amazon.com/images/I/51eOhGOaHQL.jpg',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        'Sony Xperia 5 III',
        32000,
        4,
        '24 mm, ƒ/1.7 aperture, Dual Pixel PDAF, 3-axis gyro EIS.',
        '256GB',
        '6.1‑inch (diagonal) HDR OLED display',
        TRUE,
        FALSE,
        'https://www.sony.es/image/11b000ac0e8f20fe24151fd2d5a03d1b?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1243-86d1-49d0f3a0ec15',
        'Huawei P50 Pro',
        36000,
        7,
        '50 MP, ƒ/1.8 aperture, omnidirectional PDAF, 5-axis gyro-EIS.',
        '128GB',
        '6.6‑inch (diagonal) OLED display',
        FALSE,
        TRUE,
        'https://http2.mlstatic.com/D_NQ_NP_888882-MLA49739271414_042022-O.webp',
        '9cb0662e-ce15-41b9-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-6432-86d1-49d0f3a0ec15',
        'LG G8 ThinQ',
        25000,
        8,
        '27 mm, ƒ/1.8 aperture, phase detection autofocus, OIS.',
        '128GB',
        '6.1‑inch (diagonal) P-OLED display',
        TRUE,
        FALSE,
        'https://m.media-amazon.com/images/I/61t3XDcEwCL.AC_UF894,1000_QL80.jpg',
        '9cb0662e-ce15-41b9-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf98-9876-86d1-49d0f3a0ec15',
        'iPhone 13',
        65000,
        8,
        '26 mm, ƒ/1.8 aperture, laser autofocus, IOS.',
        '128GB',
        '6.1‑inch (diagonal) P-OLED display',
        TRUE,
        FALSE,
        'https://assets.stickpng.com/images/61d2f85b92b57c0004c64745.png',
        '9cb0662e-ce15-41b9-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf98-6767-86d1-49d0f3a0ec15',
        'iPhone 14',
        75000,
        8,
        '28 mm, ƒ/1.6 aperture, autofocus, IOS.',
        '128GB',
        '6.1‑inch (diagonal) P-OLED display',
        TRUE,
        FALSE,
        'https://s13emagst.akamaized.net/products/48592/48591223/images/res_0a49cd835e308621c4ce9f501418d2a5.jpg',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    );

INSERT INTO
    public.brand_entity (id, name, image)
VALUES
    (
        'e9f7fe92-bf99-6432-86d1-49d0f3a0ec15',
        'Samsung',
        'https://1000logos.net/wp-content/uploads/2017/06/Samsung-emblem.png'
    ),
    (
        'a1b2c3d4-e5f6-a7b8-9cde-0123456789ab',
        'Xiaomi',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/512px-Xiaomi_logo_%282021-%29.svg.png'
    ),
    (
        'f9e8d7c6-b5a4-4321-9876-fedcba987654',
        'Huawei',
        'https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/2016px-Huawei_Standard_logo.svg.png'
    ),
    (
        '12345678-90ab-cdef-0123-456789abcdef',
        'Apple',
        'https://i.pinimg.com/originals/70/b9/bf/70b9bfd83ae93ae96c51d57cff1813c5.png'
    );

INSERT INTO
    public.rent_entity (
        id,
        "isActive",
        "startDate",
        "endDate",
        "paymentMethod",
        address,
        city,
        "telephoneNumber",
        "phoneId",
        "userId"
    )
VALUES
    (
        '63b99e72-21ff-42b0-a260-310f75419a29',
        true,
        '2023-11-10 19:00:00',
        '2023-12-10 19:00:00',
        'Credit card',
        'Musterstraße 123',
        'Berlin',
        '+491234567890',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        '4866d9fd-6831-4fa4-8fc1-8d2268885623',
        false,
        '2023-11-10 19:00:00',
        '2023-12-10 19:00:00',
        'Credit card',
        'Musterstraße 123',
        'Berlin',
        '+491234567890',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        '63b99e72-21ff-42b0-a260-310f75419a30',
        true,
        '2023-11-15 14:00:00',
        '2023-11-20 14:00:00',
        'PayPal',
        'Sample Address 456',
        'New York',
        '+11234567890',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        '4866d9fd-6831-4fa4-8fc1-8d2268885624',
        true,
        '2023-11-18 10:00:00',
        '2023-12-18 10:00:00',
        'Credit card',
        'Another Street 789',
        'Los Angeles',
        '+15678901234',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'f3e2d1c0-ba98-7654-3210-fedcba987655',
        true,
        '2023-11-25 08:00:00',
        '2023-12-25 08:00:00',
        'Cash',
        'Random Place 123',
        'Chicago',
        '+17890123456',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        '12345678-90ab-cdef-0123-456789abcdef',
        false,
        '2023-12-01 16:00:00',
        '2024-01-01 16:00:00',
        'Credit card',
        'Test Street 789',
        'San Francisco',
        '+19012345678',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'a1b2c3d4-e5f6-a7b8-9cde-0123456789ac',
        false,
        '2023-12-05 12:00:00',
        '2023-12-15 12:00:00',
        'PayPal',
        'Example Road 456',
        'Seattle',
        '+12098765432',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    );

INSERT INTO
    public.review_entity (
        id,
        rating,
        text,
        "phoneId",
        "userId"
    )
VALUES
    (
        'e9f7fe92-bf99-3333-86d1-49d0f3a0ec15',
        5.0,
        '¡Increíble! Rápido, elegante y la cámara toma fotos asombrosas.',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-4444-86d1-49d0f3a0ec15',
        4.0,
        'Muy satisfecho con mi compra, el rendimiento es excelente.',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-5555-86d1-49d0f3a0ec15',
        2.5,
        'No cumplió con mis expectativas, la pantalla es demasiado pequeña.',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-6666-86d1-49d0f3a0ec15',
        4.5,
        'Excelente teléfono, la calidad de construcción es impresionante.',
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-7777-86d1-49d0f3a0ec15',
        3.0,
        'El diseño es elegante, pero la duración de la batería es decepcionante.',
        'e9f7fe92-bf99-1243-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-8888-86d1-49d0f3a0ec15',
        4.0,
        'Buena opción en términos de precio y rendimiento.',
        'e9f7fe92-bf99-6432-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    -- Reviews for 'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15' (Samsung Galaxy S22)
    (
        'e9f7fe92-bf12-1033-12d1-49d033a1ec15',
        4.5,
        'Me encanta este teléfono, la cámara es increíble.',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1044-86d1-49d0f3a0ec15',
        3.5,
        'Buen rendimiento, pero el precio es un poco alto.',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1000-86d1-49d0f3a0ec15',
        4.0,
        'Gran pantalla y calidad de imagen, pero la batería podría mejorar.',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1010-86d1-49d0f3a0ec15',
        4.5,
        'La cámara frontal es impresionante, perfecta para selfies.',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1020-86d1-49d0f3a0ec15',
        3.0,
        'Buena calidad de construcción, pero la memoria podría ser mayor.',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1030-86d1-49d0f3a0ec15',
        5.0,
        'Increíble experiencia de juego, el rendimiento es sobresaliente.',
        'e9f7fe92-bf99-4323-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    -- Reviews for 'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15' (Google Pixel 7)
    (
        'e9f7fe92-bf99-2222-86d1-49d0f3a0ec15',
        3.0,
        'Buena relación calidad-precio, pero la batería podría ser mejor.',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1112-86d1-49d0f3a0ec15',
        3.0,
        'Pantalla vibrante, pero la duración de la batería es insatisfactoria.',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1245-86d1-49d0f3a0ec15',
        4.5,
        'Gran rendimiento en general, pero la interfaz de usuario podría ser más intuitiva.',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1298-86d1-49d0f3a0ec15',
        4.0,
        'Buena calidad de construcción y diseño moderno.',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1301-86d1-49d0f3a0ec15',
        2.5,
        'No estoy satisfecho con la cámara, las fotos no son tan nítidas como esperaba.',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1357-86d1-49d0f3a0ec15',
        3.5,
        'Rápido pero la memoria se llena rápidamente.',
        'e9f7fe92-bf99-1234-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    -- Reviews for 'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15' (OnePlus 10)
    (
        'e9f7fe92-bf99-1442-86d1-49d0f3a0ec15',
        4.0,
        'Gran rendimiento y velocidad, muy satisfecho con la compra.',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1558-86d1-49d0f3a0ec15',
        3.5,
        'Buena relación calidad-precio, pero el diseño podría ser más innovador.',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1674-86d1-49d0f3a0ec15',
        4.5,
        'Increíble pantalla y colores vibrantes, perfecto para multimedia.',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1790-86d1-49d0f3a0ec15',
        3.0,
        'Rápido pero la duración de la batería es limitada.',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1886-86d1-49d0f3a0ec15',
        5.0,
        'Increíble rendimiento en juegos y aplicaciones exigentes.',
        'e9f7fe92-bf99-2876-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    -- Reviews for 'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15' (Xiaomi Mi 12)
    (
        'e9f7fe92-bf99-1114-86d1-49d0f3a0ec15',
        4.5,
        'Diseño elegante y gran calidad de construcción.',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-1998-86d1-49d0f3a0ec15',
        3.0,
        'Buena cámara, pero la interfaz podría ser más amigable.',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2112-86d1-49d0f3a0ec15',
        5.0,
        'Increíble rendimiento y batería duradera.',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2226-86d1-49d0f3a0ec15',
        4.0,
        'Gran pantalla y colores vivos, perfecto para ver contenido multimedia.',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2340-86d1-49d0f3a0ec15',
        3.5,
        'Buen rendimiento, pero la memoria podría ser mayor.',
        'e9f7fe92-bf99-5321-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    -- Reviews for 'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15' (Samsung Galaxy Note 10)
    (
        'e9f7fe92-bf99-2454-86d1-49d0f3a0ec15',
        4.5,
        'Excelente calidad de pantalla y cámara.',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2567-86d1-49d0f3a0ec15',
        3.0,
        'Buena duración de la batería, pero el diseño es un poco anticuado.',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2680-86d1-49d0f3a0ec15',
        4.0,
        'Rápido y eficiente, pero el precio podría ser más competitivo.',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2793-86d1-49d0f3a0ec15',
        2.5,
        'Desempeño aceptable, pero la interfaz de usuario es complicada.',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-2906-86d1-49d0f3a0ec15',
        4.0,
        'Muy satisfecho con la compra, el rendimiento es destacado.',
        'e9f7fe92-bf99-4747-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    -- Reviews for 'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15' (Sony Xperia 5 III)
    (
        'e9f7fe92-bf99-3019-86d1-49d0f3a0ec15',
        3.5,
        'Buena calidad de construcción, pero la cámara podría mejorar.',
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-3132-86d1-49d0f3a0ec15',
        4.5,
        'Excelente rendimiento y pantalla de alta resolución.',
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-3245-86d1-49d0f3a0ec15',
        4.0,
        'Rápido y elegante, pero la batería podría durar más tiempo.',
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4077-8003-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-3358-86d1-49d0f3a0ec15',
        3.0,
        'La cámara frontal no cumple con mis expectativas.',
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4079-8078-dbfc5cfe6818'
    ),
    (
        'e9f7fe92-bf99-3471-86d1-49d0f3a0ec15',
        5.0,
        'Increíble calidad de sonido y rendimiento general.',
        'e9f7fe92-bf99-2134-86d1-49d0f3a0ec15',
        '9cb0662e-ce15-4078-8055-dbfc5cfe6818'
    );