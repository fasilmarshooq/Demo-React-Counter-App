using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace FilePost.Controllers
{
    public class DocFileController : ApiController
    {
        public HttpResponseMessage Post()
        {
            HttpResponseMessage result = new HttpResponseMessage();
            var httpRequest = HttpContext.Current.Request;
            if (httpRequest.Files.Count > 0)
            {
                
                byte[] fileData = null;
                using (var binaryReader = new BinaryReader(httpRequest.Files[0].InputStream))
                {
                    fileData = binaryReader.ReadBytes(httpRequest.Files[0].ContentLength);
                }
                var dataStream = new MemoryStream(fileData);
                result.StatusCode = HttpStatusCode.OK;
                result.Content = new StreamContent(dataStream);
                result.Content.Headers.ContentType =
                    new MediaTypeHeaderValue(MimeMapping.GetMimeMapping(Path.GetExtension(httpRequest.Files[0].FileName)));
                result.Content.Headers.ContentDisposition = new ContentDispositionHeaderValue("attachment")
                {
                    FileName = httpRequest.Files[0].FileName
                };
                return result;
               
            }
            else
            {
                result = Request.CreateResponse(HttpStatusCode.BadRequest, "somethin went wrong");
            }
            return result;
        }
    }
}
