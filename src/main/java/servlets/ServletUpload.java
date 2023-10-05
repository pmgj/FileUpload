package servlets;

import java.io.IOException;
import java.util.Collection;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.MultipartConfig;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Part;

@WebServlet(name = "ServletUpload", urlPatterns = {"/upload"})
@MultipartConfig
public class ServletUpload extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        Collection<Part> items = req.getParts();

        for (Part item : items) {
            // Mandar o arquivo para o diretório informado
            String nome = item.getSubmittedFileName();
            item.write(nome);
        }

        resp.setContentType("text/html");
        resp.getWriter().write("<h2>Successfully Uploaded Images</h2>");
    }
}
