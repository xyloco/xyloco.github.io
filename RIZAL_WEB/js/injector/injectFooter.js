document.addEventListener("DOMContentLoaded", async () => {

    const container =
        document.getElementById("footer-container");

    if (!container) return;


    try {

        const isPage =
            window.location.pathname.includes("/pages/");


        const footerPath =
            isPage
                ? "../injected/footer.html"
                : "injected/footer.html";


        const response =
            await fetch(footerPath);


        if (!response.ok) {

            throw new Error(
                `Failed to load footer: ${response.status}`
            );

        }


        container.innerHTML =
            await response.text();


        const footerHomeLink =
            document.getElementById(
                "footer-home-link"
            );


        if (footerHomeLink) {

            footerHomeLink.href =
                isPage
                    ? "../index.html"
                    : "index.html";

        }


    } catch (error) {

        console.error(
            "Failed to load footer:",
            error
        );

    }

});
