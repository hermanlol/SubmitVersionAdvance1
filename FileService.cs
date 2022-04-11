using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon.S3.Model;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Talent.Common.Aws;
using Talent.Common.Contracts;

namespace Talent.Common.Services
{
    public class FileService : IFileService
    {
        private readonly IHostingEnvironment _environment;
        private readonly string _tempFolder;
        private IAwsService _awsService;
        private string _bucketName;
        public FileService(IHostingEnvironment environment, 
            IAwsService awsService)
        {
            _environment = environment;
            _tempFolder = "images\\";
            _awsService = awsService;
            _bucketName = "myawsinternphoto";
        }

        public async Task<string> GetFileURL(string id, FileType type)
        {
            var url = await _awsService.GetPresignedUrlObject(id, _bucketName);
            return url;
        }

        public async Task<string> SaveFile(IFormFile file, FileType type)
        {
            //Your code here;
            //PutFileToS3
            string fileName = "";
            string pathWeb = _environment.WebRootPath;
            string BucketName = _bucketName;

            if (file != null && type == FileType.ProfilePhoto && pathWeb != "")
            {
                fileName = $@"{DateTime.Now.Ticks}_" + file.FileName;
                string path = pathWeb + _tempFolder + fileName;
                using (var fileStream = new FileStream(path, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                    if (!await _awsService.PutFileToS3(fileName, fileStream, BucketName))

                    {

                        fileName = "";

                    }

                }
            }

            return fileName;
        }

        public async Task<bool> DeleteFile(string id, FileType type)
        {
            string pathWeb = _environment.WebRootPath;
            string BucketName = _bucketName;

            if (id != null && type == FileType.ProfilePhoto && !string.IsNullOrWhiteSpace(pathWeb))
            {

                string fullFileName = Path.Combine(pathWeb, _tempFolder, id);
                if (File.Exists(fullFileName))
                {
                    File.Delete(fullFileName);
                    if (!await _awsService.RemoveFileFromS3(id, BucketName))
                    {

                        return true;

                    }
                    return false;
                }
            }
            return false;

        }


        #region Document Save Methods

        private async Task<string> SaveFileGeneral(IFormFile file, string bucket, string folder, bool isPublic)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        
        private async Task<bool> DeleteFileGeneral(string id, string bucket)
        {
            //Your code here;
            throw new NotImplementedException();
        }
        #endregion
    }
}
